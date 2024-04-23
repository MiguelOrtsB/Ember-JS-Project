import { module, test } from 'qunit';
import { setupTest } from 'proyecto2/tests/helpers';

module('Unit | Route | bookings/create-booking', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:bookings/create-booking');
    assert.ok(route);
  });
});
