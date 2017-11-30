class ServiceHooks {
  constructor(authenticator, commonHooks, commonErrors) {
    this._commonHooks = commonHooks;
    this._errors = commonErrors;
    this._authenticator = authenticator;
    
    this.hooks = {
      before: {
        all: [
          function (that) {
            return function (context) {
              var appKey = (context.params.headers) ? context.params.headers['app-key'] : undefined;
              if (!that._authenticator.authenticate(context.method, appKey)) {
                throw new that._errors.Forbidden('Provided app key is incorrect.');
              }
            };
          }(this)
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      },
    
      after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      },
    
      error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      }
    };
  }
}

module.exports = ServiceHooks;
