class KeyAuthenticator {
  constructor(secretKey) {
    this._secretKey = secretKey;
    this._methodsToAuth = [];
  }

  addMethodsToAuthenticate(methods) {
    this._methodsToAuth = this._methodsToAuth.concat(methods);
  }

  authenticate(method, appKey) {
    if (this._methodsToAuth.indexOf(method) === -1) return true;

    return appKey === this._secretKey;
  }
}

module.exports = KeyAuthenticator;
