(function () {
  'use strict';

  angular.module('app.controllers')
    .controller('AppController', AppController);

    AppController.$inject = ['stationFactory'];

    function AppController(stationFactory) {
      var vm = this;

      vm.displayStation = displayStation;
      vm.setTimeScale = setTimeScale;
      vm.setTimeStepSize = setTimeStepSize;

      vm.stepSize = 1;
      vm.chartSeries = [];
      vm.chartData = [];

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
                'second': 'kk:mm:ss',
                'minute': 'kk:mm',
                'hour': 'kk:mm'
              },
              tooltipFormat: 'MMM D, HH:mm:ss A',
              stepSize: vm.stepSize
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
      });

      function _getDependencies() {
        return stationFactory.query();
      }

      function _updateChart(selectedStation) {
        vm.chartData = _updateData(selectedStation.measurements);
        vm.chartSeries = _updateSeries(selectedStation);
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
        if (vm.selectedStation && station.displayName === vm.selectedStation.displayName) return;

        vm.selectedStation = station;
        vm.hideDefault = true;

        station.getMeasurementsForStation().then(function () {
          _updateChart(vm.selectedStation);
        });
      }

      function setTimeScale(newUnit) {
        vm.chartOptions.scales.xAxes[0].time.unit = newUnit;
      }

      function setTimeStepSize(num) {
        vm.chartOptions.scales.xAxes[0].time.stepSize = num;
      }
    }
}());
