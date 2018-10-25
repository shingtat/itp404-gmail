import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    // Data Down, Actions Up (DDAU) -> One way data flow
    // Idea is to create stars in the index page.
    // Change the email model stars mode here
    // Stars component only controls the appearance, and not the persistence of data
    star(email){
      email.set('starred', !email.starred);
      email.save();
    }
  }
});
