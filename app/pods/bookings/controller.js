import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class BookingsController extends Controller {
  @service Bookings;
  @service router;
  @service Form;

  // Función que al hacer click en el botón nos redirige a la subruta 'booking-card' y le pasa como parámetro un objeto que representa el booking que queremos editar
  @action
  goToBookingCard(booking) {
    this.Bookings.selectedBooking = booking;
    this.Bookings.createBooking = false; // Cambiamos la variable reactiva a false porque queremos editar un booking existente
    this.Bookings.smallForm = false;
    this.router.transitionTo('bookings.booking-card', booking);
  }

  // Función que al hacer click en el botón nos redirige a la subruta 'booking-card' y le pasa como parámetro un objeto nuevo que representa el booking que queremos crear
  @action
  onClickCreate() {
    this.Bookings.createBooking = true; // Cambiamos la variable reactiva a true porque queremos crear un nuevo booking
    this.Bookings.smallForm = false;
    let newBooking = {
      id: null,
      hotelId: '',
      startDate: '',
      endDate: '',
      description: '',
      pax: 0,
    };
    this.Bookings.selectedBooking = newBooking;
    this.router.transitionTo('bookings.booking-card', newBooking);
  }

  @action
  onClickDelete() {
    this.Bookings.smallForm = true;
    let newBooking2 = {
      id: null,
      hotelId: '',
      startDate: '',
      endDate: '',
      description: '',
      pax: 0,
    };
    this.Bookings.selectedBooking = newBooking2;
    this.router.transitionTo('bookings.booking-card', newBooking2);
  }
}
