import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return i + 1;
  },
  from(){
    return faker.internet.email();
  },
  to(){
    return faker.internet.email();
  },
  subject(){
    return faker.random.word();
  },
  message(){
    return faker.lorem.paragraph();
  },
  starred(){
    return false;
  }
});
