import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service router;
  @service Application;

  init() {
    super.init(...arguments);
  }

  // Función que es la primera que se ejecuta cuando se carga la ruta 'home' y comprubea si el usuario se ha registrado para evitar que acceda a ella
  beforeModel(transition) {
    this.Application.storageUserName = sessionStorage.getItem('usuario'); // Asignamos el NUEVO usuario guardado en la sessionStorage para asignarle el nombre correcto
    // if (this.Application.logedUser == null) {
    if (!sessionStorage.getItem('usuario')) {
      this.router.transitionTo('/');
    } else {
      return super.beforeModel(transition);
    }
  }
}
