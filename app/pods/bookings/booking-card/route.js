import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BookingsBookingCardRoute extends Route {
  @service Bookings;
  @service router;
  @service Application;
  @service Form;

  beforeModel(transition) {
    // if (this.Application.logedUser == null) {
    if (!this.Application.token) {
      this.router.transitionTo('/');
    } else {
      if(this.Bookings.selectedBooking != null){
        this.Form.loadHotelList(); /* Cargamos la lista de hoteles para poder acceder a ella y recorrerla en el template (si no la cargamos aquí, solo se visualizará cuando 
        accedamos a la ruta de 'Accommodations' que es donde está definida) */
        return super.beforeModel(transition);
      }else{
        this.router.transitionTo('bookings');
      }
    }
  }

  // Función para configurar el estado inicial del controlador. Asigna un valor a una propiedad del controlador (booking) basado en el contexto actual de la ruta, y luego llama a un método personalizado en el controlador showVars()
  setupController(controller) {
    controller.booking = this.context; // Esta es otra forma de asignar el booking que se ha pasado como parámetro (this.context) en la ruta (igual que el selectedBooking)
    controller.showVars();
  }
}
