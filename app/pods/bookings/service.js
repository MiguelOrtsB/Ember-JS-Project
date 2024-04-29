import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class BookingsService extends Service {
  // Array que almacenará los objetos del JSON
  @tracked bookingList = A();

  // Variable que asignará el objeto booking seleccionado en el template para editarlo en booking-card (se asigna en el controlador)
  @tracked selectedBooking = null;

  // Variable reactiva que comprobará si queremos crear o editar un Booking
  @tracked createBooking = null;

  // Variable para desplegar el formulario grande (de Editar/Crear) o el pequeño (de eliminar) en la ruta 'booking-card'
  @tracked smallForm = null;

  // Variable que contendrá en nuevo Booking creado en el controller de la ruta booking-card
  // @tracked newBooking = null;

  // Variable que asignará en nuevo ID (en el cotroller del 'boking-card') del nuevo Booking
  // @tracked newId = null;

  loadBookingListFromLocalStorage() {
    let response = localStorage.getItem('bookings'); // Guardamos en un variable el JSON almacenado localmente en el navegador recuperando el valor asociado a la clave 'bookings'
    let convert = JSON.parse(response); // Lo parseamos a objetos Javascript
    this.bookingList = convert; // Los añadimos a la lista instanciada anteriormente
  }

  saveBookingList() {
    let convert = JSON.stringify(this.bookingList); // Tomamos los objetos Javascript de la lista y los parseamos a JSON
    localStorage.setItem('bookings', convert); // Y los almacenamos en el local storage del navegador
  }
}
