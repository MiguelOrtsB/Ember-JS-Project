import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class ApplicationService extends Service {
  serviceVariable = 'Variable inicializada en Service';

  // Array que contendrá la lista de usuarios
  userList = A();

  // Variable para comprobar si el usuario se ha logueado
  @tracked logedUser = null;

  // Variable que asignará en la ruta Home en nuevo usuario de la sesión para que muestre el mensaje de 'Bienvenido' correctamente
  @tracked storageUserName = null;

  // Al acceder a la ruta se carga la lista de usuarios (por lo que no hace falta que esté trackeada ya que será lo primero que se inicie)
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
