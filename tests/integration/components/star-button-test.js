import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | star-button', function(hooks) {
  setupRenderingTest(hooks);

  test('star is filled when starred is true', async function(assert) {
     // set the outer context to red
     this.set('starTest', true);

     await render(hbs`{{star-button starred=starTest}}`);
     assert.equal(this.element.querySelector('img').getAttribute('src'), '/assets/images/filled-star.jpg');
  });

  test('star is empty when starred is false', async function(assert) {
     this.set('starTest', false);
     await render(hbs`{{star-button starred=starTest}}`);
     assert.equal(this.element.querySelector('img').getAttribute('src'), '/assets/images/transparent-star.png');
  });
});
