import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import window, { reset } from 'ember-window-mock';

module('Acceptance | emails', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  hooks.afterEach(function() {
    reset();
  });

/*
the inbox displays starred and unstarred emails
Seed Mirage with 2 starred emails and 3 unstarred emails.
  Verify that 2 emails were rendered in the starred section and 3 were rendered in the unstarred section.

viewing a single email
  Verify that all of the email attributes were rendered.

deleting a single email
  Seed Mirage with 2 unstarred emails. Verify that when the trash icon is clicked for either of the emails, the unstarred list contains 1 email and the current URL is /.

creating an email
  Seed Mirage with 0 emails. Verify that when a user fills out the new email form and clicks the submit button,
  the number of emails in the unstarred section is 1.
  Verify that the current URL is /.
  Verify that all of the data was sent to the server by inspecting Mirage’s server.db.emails[0].
*/


  test('inbox displays starred and unstarred emails', async function(assert) {
    server.create('email', { starred: 'true'});
    server.create('email', { starred: 'true'});
    server.create('email', { starred: 'false'});
    server.create('email', { starred: 'false'});
    server.create('email', { starred: 'false'});

    await visit('/');

    assert.dom('[data-test="starred"]').exists({ count: 2 });
    assert.dom('[data-test="unstarred"]').exists({ count: 3 });
  });

  test('viewing a single email', async function(assert) {
    server.create('email', {
      from: 'Sender 1',
      to: 'Receiver 1',
      subject: 'Email 1',
      message: 'Test Message 1',
      starred: 'false'
    });

    await visit('/emails/1');

    assert.dom('[data-test="email-id"]').hasText('ID: 1');
    assert.dom('[data-test="email-from"]').hasText('From: Sender 1');
    assert.dom('[data-test="email-to"]').hasText('To: Receiver 1');
    assert.dom('[data-test="email-subject"]').hasText('Subject: Email 1');
    assert.dom('[data-test="email-message"]').hasText('Message: Test Message 1');
  });

  test('deleting a single email', async function(assert) {
    server.create('email', { starred: 'false'});
    server.create('email', { starred: 'false'});

    window.confirm = () => true;

    await visit('/emails/1');
    await click('[data-test="delete-email"]');

    assert.equal(currentURL(), '/');

    assert.dom('[data-test="unstarred"]').exists({ count: 1 });
  });

  test('creating an email', async function(assert) {
    await visit('/emails/new');
    await fillIn('#from', 'Sender 1');
    await fillIn('#to', 'Receiver 1');
    await fillIn('#subject', 'Email 1');
    await fillIn('#message', 'I love testing!');
    await click('[data-test="publish"]');

    assert.equal(currentURL(), '/');
    assert.dom('[data-test="unstarred"]').exists({ count: 1 });

    assert.equal( server.db.emails[0].id, '1');
    assert.equal( server.db.emails[0].from, 'Sender 1');
    assert.equal( server.db.emails[0].to, 'Receiver 1');
    assert.equal( server.db.emails[0].subject, 'Email 1');
    assert.equal( server.db.emails[0].message, 'I love testing!');

  });

});
