import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    deletePost(email) {
      let confirmed = window.confirm(
        'Are you sure you want to delete this post?'
      );

      if (confirmed) {
        email.destroyRecord().then(()=>{
          this.transitionToRoute('index');
        });
      }
    }
  }
});
