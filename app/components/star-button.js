import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  init(){
    this._super(...arguments);
  },
  click(){
    this.set('starred', !this.starred);
  },
  source: computed('starred', function(){
    let string = '/assets/images/';
    if(this.starred){
      string+="filled-star.jpg";
    }
    else{
      string+="transparent-star.png";
    }
    return string;
  })
});
