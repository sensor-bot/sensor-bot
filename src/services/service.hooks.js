class ServiceHooks {
  constructor(authenticator, commonHooks, commonErrors) {
    this._commonHooks = commonHooks;
    this._errors = commonErrors;
    this._authenticator = authenticator;
    
    this.hooks = {
      before: {
        all: [
          this._commonHooks.iff((hook) => {
            // 403 if authentication fails
            return this._authenticator.authenticate(hook.method, hook.data);
          }, () => {
            throw new this._errors.Forbidden('Provided app key is incorrect.');
          })
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
