const Authenticator = require('../policies/base.authenticator');

class KeyAuthenticator extends Authenticator{
  constructor(secretKey) {
    super();
    this._secretKey = secretKey;
  }

  _authenticateImpl(appKey) {
    if (!this._secretKey) return true;

    return appKey === this._secretKey;
  }
}

module.exports = KeyAuthenticator;
