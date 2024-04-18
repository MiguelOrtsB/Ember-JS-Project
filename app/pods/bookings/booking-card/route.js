import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BookingsBookingCardRoute extends Route {
    @service Bookings;
    @service router;
    @service Application;

    beforeModel(transition) {
        if (this.Application.logedUser == null) {
            this.router.transitionTo('/');
        } else {
            return super.beforeModel(transition);
        }
    }

    // Función para configurar el estado inicial del controlador. Asigna un valor a una propiedad del controlador (booking) basado en el contexto actual de la ruta, y luego llama a un método personalizado en el controlador showVars()
    setupController(controller){
        controller.booking = this.context; // Esta es otra forma de asignar el booking que se ha pasado como parámetro (this.context) en la ruta (igual que el selectedBooking)
        controller.showVars();
    }
}
