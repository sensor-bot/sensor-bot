class Authenticator {
  constructor() {
    this._methodsToAuth = [];
  }

  addMethodsToAuthenticate(methods) {
    this._methodsToAuth = this._methodsToAuth.concat(methods);
  }

  isMethodAuthenticated(method) {
    return this._methodsToAuth.indexOf(method) !== -1;
  }

  authenticate(method, params) {
    if (!this.isMethodAuthenticated(method)) return true;

    return this._authenticateImpl(params);
  }

  // NOTE: Override this method in child class
  _authenticateImpl() {
    return true;
  }
}

module.exports = Authenticator;
