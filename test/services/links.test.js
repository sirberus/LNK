const app = require('../../src/app');

describe('\'links\' service', () => {
  it('registered the service', () => {
    const service = app.service('links');
    expect(service).toBeTruthy();
  });
});
