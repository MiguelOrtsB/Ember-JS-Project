import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service router;
  @service Application;
  @service Home;

  init() {
    super.init(...arguments);
  }

  // Función que es la primera que se ejecuta cuando se carga la ruta 'home' y comprubea si el usuario se ha registrado para evitar que acceda a ella
  beforeModel(transition) {
    // this.Application.storageUserName = sessionStorage.getItem('usuario'); // Asignamos el NUEVO usuario guardado en la sessionStorage para asignarle el nombre correcto
    // if (this.Application.logedUser == null) {
    if (!this.Application.token) {
      this.router.transitionTo('/');
    } else {
        if(localStorage.getItem('showModalDialog') == '1'){
            this.Home.dontShowModal = true;
        }
        return super.beforeModel(transition);
    }
  }
}
