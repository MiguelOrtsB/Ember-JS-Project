import { module, test } from 'qunit';
import { setupTest } from 'proyecto2/tests/helpers';

module('Unit | Controller | bookings/create-booking', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:bookings/create-booking');
    assert.ok(controller);
  });
});
