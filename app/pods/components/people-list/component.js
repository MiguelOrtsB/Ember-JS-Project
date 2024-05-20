import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PeopleListComponent extends Component {
  // @service Application;

  // users = this.Application.userList;
}

// Forma 2 de componente que genera una lista (usuarios, por ejemplo) y la pinta. En este caso llamamos la lista de usuarios que procede de la API y que se ha asignado en el
// servicio de la Application, por lo que lo inyectamos y lo asignamos a una variable (users). A continuación, la pintamos en el template de este componente con un each.
