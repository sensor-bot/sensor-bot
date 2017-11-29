const assert = require('assert');
const app = require('../../src/app');

describe('\'measurement\' service', () => {
  it('registered the service', () => {
    const service = app.service('measurement');

    assert.ok(service, 'Registered the service');
  });
});
