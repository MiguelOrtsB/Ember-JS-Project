import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BookingsRoute extends Route {
  @service Application;
  @service Bookings;
  @service router;
  @service Form;

  init() {
    super.init(...arguments);
  }

  beforeModel(transition) {
    // if (this.Application.logedUser == null) {
    if (!sessionStorage.getItem('usuario')) {
      this.router.transitionTo('/');
    } else {
      this.Bookings.loadBookingListFromLocalStorage(); // Cargamos la lista de objetos (bookings) al cargar la página
      this.Form.loadHotelList(); /* Cargamos la lista de hoteles para poder acceder a ella y recorrerla en el template (si no la cargamos aquí, solo se visualizará cuando 
        accedamos a la ruta de 'Accommodations' que es donde está definida) */
      return super.beforeModel(transition);
    }
  }
}
