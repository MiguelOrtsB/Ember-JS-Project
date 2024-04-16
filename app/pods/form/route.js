import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FormRoute extends Route {
  @service router;
  @service Application;
  @service Form;

  init() {
    super.init(...arguments);
  }

  // Función que es la primera que se ejecuta cuando se carga la ruta 'form' y comprubea si el usuario se ha registrado para evitar que acceda a ella
  beforeModel(transition) {
    if (this.Application.logedUser == null) {
      this.router.transitionTo('/');
    } else {
      this.Form.loadHotelList(); // Si se ha registrado el usuario, cargamos la lista de hoteles
      return super.beforeModel(transition);
    }
  }
}
