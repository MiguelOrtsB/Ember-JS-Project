import { module, test } from 'qunit';
import { setupTest } from 'proyecto2/tests/helpers';

module('Unit | Controller | form', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:form');
    assert.ok(controller);
  });
});
