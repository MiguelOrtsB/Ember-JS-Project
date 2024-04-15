import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PeopleListComponent extends Component {
  @service Application;

  users = this.Application.userList;
}
