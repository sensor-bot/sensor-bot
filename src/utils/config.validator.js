class ConfigValidator {
  constructor() {
    this._warnNoSetConfigs = {
      'APP_SECRET': 'Set this to restrict access to your data'
    };
  }

  checkEnv() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toLowerCase() !== 'production') {
      global.logger.warn('NODE_ENV is not set to "production"');
    }

    this._checkNoSets();
  }

  _checkNoSets() {
    Object.keys(this._warnNoSetConfigs).forEach((k) => {
      if (!process.env[k]) {
        global.logger.warn(`${k} is not set. ${this._warnNoSetConfigs[k]}`);
      }
    });
  }
}

module.exports = ConfigValidator;
