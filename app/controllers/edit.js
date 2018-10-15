import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    editPost(email, event) {
      event.preventDefault();

      // let post = this.model;
      email.save().then(() => {
        this.transitionToRoute('email', email.id);
      });
    }
  }
});
