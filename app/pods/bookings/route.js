import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BookingsRoute extends Route {
  @service Application;
  @service Bookings;
  @service router;

  init() {
    super.init(...arguments);
  }

  beforeModel(transition) {
    if (this.Application.logedUser == null) {
      this.router.transitionTo('/');
    } else {
      this.Bookings.loadBookingListFromLocalStorage(); // Cargamos la lista de objetos (bookings) al cargar la página
      return super.beforeModel(transition);
    }
  }
}
