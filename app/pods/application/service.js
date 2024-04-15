import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class ApplicationService extends Service {
  serviceVariable = 'Variable inicializada en Service';

  // Array que contendrá la lista de usuarios
  userList = A();

  // Variable para comprobar si el usuario se ha logueado
  @tracked logedUser = null;

  // Al acceder a la ruta se carga la lista de usuarios
  init() {
    super.init(...arguments);
    console.log('initService');
    this.loadUserList();
  }

  // Cargamos la lista de usuarios del JSON y la asignamos al array anterior
  async loadUserList() {
    let response = await fetch('/api/users.json');
    let data = await response.json();
    this.userList = data;
    console.log(this.userList);
  }
}
