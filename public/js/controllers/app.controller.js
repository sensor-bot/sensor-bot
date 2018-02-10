(function () {
  'use strict';

  angular.module('app.controllers')
    .controller('AppController', AppController)
    .config(($locationProvider) => {
      $locationProvider.html5Mode(true);
    });

    AppController.$inject = ['stationFactory', 'Notification', '$location'];

    function AppController(stationFactory, Notification, $location) {
      var vm = this;

      vm.displayStation = displayStation;
      vm.setTimeScale = setTimeScale;
      vm.setTimeStepSize = setTimeStepSize;
      vm.updateStation = updateStation;

      vm.stepSize = 1;
      vm.chartSeries = [];
      vm.chartData = [];
      vm.loading = true;
      vm.defaultAxis = true;
      vm.timeScale = 'hour';

      vm.chartOptions = {
        animation: false,
        legend: {
          display: true
        },
        tooltips: {
          mode: 'point',
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                'second': 'MMM D, kk:mm:ss',
                'minute': 'MMM D, kk:mm',
                'hour': 'MMM D, kk:mm'
              },
              tooltipFormat: 'MMM D, kk:mm:ss',
              stepSize: 1,
            },
            display: true
          }]
        },
        elements: {
          line: {
            fill: false
          }
        }
      };
      Chart.defaults.global.elements.point.hitRadius = 3;

      _getDependencies().then((stations) => {
        vm.stations = stations;
        vm.loading = false;

        let startStationName = $location.hash();
        let startStation = vm.stations.find(s => s.displayName === startStationName)
        if (!startStation) return;

        displayStation(startStation);
      });

      function _getDependencies() {
        return stationFactory.query();
      }

      function _updateSettings(selectedStation) {
        vm.settings = {
          displayName: selectedStation.displayName,
          channelNames: Object.keys(selectedStation.measurements).map((k) => {
            return {
              index: k,
              name: selectedStation.channelDisplayNames[k]
            };
          })
        };
      }

      function _updateChart(selectedStation) {
        vm.chartData = _updateData(selectedStation.measurements);
        vm.chartSeries = _updateSeries(selectedStation);

        let newAxis = determineNewAxis();
        if (!newAxis) return;

        setTimeScale(newAxis.scale);
        setTimeStepSize(newAxis.stepSize);

        function determineNewAxis() {
          if (selectedStation.measurements.length <= 1) return false;

          let endTime = new Date(selectedStation.measurements[0][0].createdAt);
          let startTime = new Date(selectedStation.measurements[0][selectedStation.measurements[0].length - 1].createdAt);

          let totalMilliseconds = endTime - startTime;
          let milliPerStep = totalMilliseconds / 10;

          const milliPerHour = 1000*60*60;
          const milliPerMinute = 1000*60;
          let scale = milliPerStep > milliPerHour ? 'hour' : milliPerStep > milliPerMinute ? 'minute' : 'second';
          let stepSize = Math.floor(scale === 'hour' ? milliPerStep / milliPerHour : scale === 'minute' ? milliPerStep / milliPerMinute : milliPerStep / 1000);

          return {
            scale,
            stepSize
          };
        }
      }

      function _updateData(measurements) {
        return Object.keys(measurements).map((k) => {
          return measurements[k].map((m) => {
            return {
              x: new Date(m.createdAt),
              y: m.value
            };
          });
        });
      }

      function _updateSeries(selectedStation) {
        return Object.keys(selectedStation.measurements).map((k) => {
          return selectedStation.channelDisplayNames[k] || `Channel ${k}`;
        });
      }

      function displayStation(station) {
        vm.loading = true;
        if (vm.selectedStation && station.localId === vm.selectedStation.localId) return;

        vm.selectedStation = station;

        station.getMeasurementsForStation().then(function () {
          _updateChart(vm.selectedStation);
          _updateSettings(vm.selectedStation);

          vm.hideDefault = true;
          vm.loading = false;
        }).catch(function (res) {
          vm.loading = false;
          Notification.error(`Error: ${res.data.message}`);
        });
      }

      function setTimeScale(newUnit, fromUi) {
        if (fromUi) {
          vm.defaultAxis = false;
        }
        vm.timeScale = newUnit;

        vm.chartOptions.scales.xAxes[0].time.unit = newUnit;
      }

      function setTimeStepSize(num, fromUi) {
        if (fromUi) {
          vm.defaultAxis = false;
        }
        vm.stepSize = num.toString();

        var asNumber = Number(num);
        if (isNaN(asNumber) || asNumber === 0) return;

        vm.chartOptions.scales.xAxes[0].time.stepSize = num;
      }

      function updateStation() {
        vm.loading = true;
        vm.selectedStation.displayName = vm.settings.displayName;

        var channelIndexes = vm.settings.channelNames.map(c => Number(c.index));
        var maxChannelIndex = Math.max(...channelIndexes);
        vm.selectedStation.channelDisplayNames = new Array(maxChannelIndex + 1);
        vm.settings.channelNames.forEach((c) => {
          vm.selectedStation.channelDisplayNames[c.index] = c.name;
        });

        vm.selectedStation.update(vm.settings.secretKey).then(function () {
          vm.chartSeries = _updateSeries(vm.selectedStation);
          $('#data-tab').tab('show');
          vm.settings.secretKey = undefined;
          vm.loading = false;

          Notification.success('Measurement station updated');
        }).catch(function (res) {
          vm.loading = false;
          Notification.error(`Error: ${res.data.message}`);
        });
      }
    }
}());
