import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class BookingsController extends Controller {
  @service Bookings;
  @service router;

  // Función que al hacer click en el botón nos redirige a la subruta 'booking-card' y le pasa como parámetro un objeto que representa el booking que queremos editar
  @action
  goToBookingCard(booking){
    this.Bookings.selectedBooking = booking;
    console.log(booking);
    this.router.transitionTo('bookings.booking-card', booking);
  }
}
