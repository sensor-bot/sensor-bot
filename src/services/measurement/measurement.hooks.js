var errors = require('@feathersjs/errors');
var hooks = require('feathers-hooks-common');

var KeyAuthenticator = require('../../policies/key.authentication');

module.exports = function (app) {
  var keyAuthenticator = new KeyAuthenticator(app.get('appSecret'));
  keyAuthenticator.addMethodsToAuthenticate(['create']);

  return {
    before: {
      all: [
        hooks.iff((hook) => {
          // 403 if authentication fails
          return keyAuthenticator.authenticate(hook.method, hook.data);
        }, () => {
          throw new errors.Forbidden('Provided app key is incorrect.');
        })
      ],
      find: [],
      get: [],
      create: [],
      update: hooks.disallow(),
      patch: hooks.disallow(),
      remove: hooks.disallow()
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
};
