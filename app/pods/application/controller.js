import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import swal from 'sweetalert';

export default class ApplicationController extends Controller {
  // Inyectamos los servicios para acceder a las propiedades de router de Ember y para poder acceder al contenido del servicio de Application
  @service router;
  @service Application;

  controllerVariable = 'Variable inicializada en Controller';

  // Variables que almacenarán usuario y contraseña y reasignarán su valor dinámicamente
  @tracked username = '';
  @tracked password = '';

  // Función que se inicia automáticamente al cargar la página (la primera de todas)
  init() {
    super.init(...arguments);
    console.log('initController');
  }

  // Función para mostrar la lista de usuarios
  showUserList() {
    console.log(this.Application.userList);
  }

  // Función con la acción para reasignar el valor del nombre de usuario introducidas en el input del template
  @action
  onInputUsername(e) {
    this.username = e.target.value;
  }

  // Función con la accion para reasignar el valor de la contraseña introducidas en el input del template
  @action
  onInputPassword(e) {
    this.password = e.target.value;
  }

  // Función con la acción con la lógica para comprobar si el usuario y contraseña son correctos una vez hecho click en el botón de iniciar sesión
  @action
  onClickLogin() {
    let logged = false;
    for (let i = 0; i < this.Application.userList.length; i++) {
      const user = this.Application.userList[i];
      if (user.username == this.username && user.password == this.password) {
        logged = true;
        this.Application.logedUser = user;
        sessionStorage.setItem(
          'usuario',
          JSON.stringify(this.Application.logedUser.username)
        ); // Guardamos la sesión con el usuario actual
      }
    }
    if (logged) {
      this.router.transitionTo('home');
    } else {
      swal('Error', 'Nombre de usuario o contraseña incorrectos.', 'error');
      this.Application.logedUser = null;
      this.router.transitionTo('/');
    }
  }

  // Función para cerrar sesión y regresar a la página de Login
  @action
  onClickLogout() {
    this.Application.logedUser = null;
    sessionStorage.removeItem('usuario'); // Eliminamos la sesión del usuario actual
    this.router.transitionTo('/');
  }

  get isLoggedIn() {
    // Verifica si hay un usuario en la sesión
    return sessionStorage.getItem('usuario');
  }
}
