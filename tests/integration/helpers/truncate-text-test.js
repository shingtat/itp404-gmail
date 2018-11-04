import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | truncate-text', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('text truncated to number of characters passed in', async function(assert) {
    this.set('message', 'simple message');
    this.set('length', 5);

    await render(hbs`{{truncate-text message length}}`);

    assert.equal(this.element.textContent.trim().length, 8);
  });

  test('text not truncated when length too short', async function(assert) {
    this.set('message', 'short');
    this.set('length', 2);

    await render(hbs`{{truncate-text message length}}`);

    assert.equal(this.element.textContent.trim().length, 5);
  });
});
