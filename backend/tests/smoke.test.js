import app from '../app.js';

describe('smoke tests', () => {
  test('app exports something', () => {
    expect(app).toBeDefined();
  });
});
