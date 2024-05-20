import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class ApplicationService extends Service {
  serviceVariable = 'Variable inicializada en Service';

  @tracked token = null;

  // Array que contendrá la lista de usuarios
  @tracked userList = A();

  // Variable que asignará en la ruta Home en nuevo usuario de la sesión para que muestre el mensaje de 'Bienvenido' correctamente
  @tracked storageUserName = null;

  // Al acceder a la ruta se carga la lista de usuarios (por lo que no hace falta que esté trackeada ya que será lo primero que se inicie)
  init() {
    super.init(...arguments);
    console.log('initService');
    this.loadUserList();
    this.getTokenFromSessionStorage();
  }

  // Cargamos la lista de usuarios del JSON y la asignamos al array anterior
  async loadUserList() {
    let response = await fetch('/api/users.json');
    let data = await response.json();
    this.userList = data;
    console.log(this.userList);
  }

  getTokenFromSessionStorage() {
    let sessionData = sessionStorage.getItem('token'); // Guardamos en un variable el JSON almacenado localmente en el navegador recuperando el valor asociado a la clave 'bookings'
    let token = JSON.parse(sessionData); // Lo parseamos a objetos Javascript
    this.token = token; // Los aasignamos a la variable instanciada anteriormente
}
}
