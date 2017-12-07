class StationController {
  constructor() {
    this._updateWhitelistAndDefaults = {
      'displayName': undefined,
      'channelDisplayNames': []
    };
  }

  // Whitelist specific update fields and assign their default values if necessary
  addCleanUpdateHook() {
    var that = this;

    return cleanUpdateHook;

    function cleanUpdateHook(context) {
      var updateSet = { };
      Object.keys(that._updateWhitelistAndDefaults).forEach((key) => {
        updateSet[key] = context.data[key] || that._updateWhitelistAndDefaults[key];
      });

      delete context.data;
      context.data = { $set: updateSet };
    }
  }
}

module.exports = StationController;
