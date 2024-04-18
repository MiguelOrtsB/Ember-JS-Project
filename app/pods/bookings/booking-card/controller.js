import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';


export default class BookingsBookingCardController extends Controller {
    @service Bookings;
    @service router;

    // Propiedad que asignará el objeto booking seleccionado en el template para editarlo aquí en booking-card (se asigna en el route)   
    @tracked booking = null;

    // Seteamos los campos introducidos en los inputs del formulario como nuevo valor 
    @action
    onInputStartDate(e) {
        set(this.Bookings.selectedBooking, 'startDate', e.target.value)
    }

    @action
    onInputEndDate(e) {
        set(this.Bookings.selectedBooking, 'endDate', e.target.value)
    }

    @action
    onInputDescription(e) {
        // this.Bookings.selectedBooking.description = e.target.value;
        set(this.Bookings.selectedBooking, 'description', e.target.value)
    }

    @action
    onInputPax(e) {
        set(this.Bookings.selectedBooking, 'pax', e.target.value)
    }

    // Función que imprime las dos formas de llamar al parámetro (objeto booking) pasado en la ruta, el cuál es el que se quiere editar
    showVars() {
        console.log(this.booking);
        console.log(this.Bookings.selectedBooking);
    }

    // Función que llama a otra del servicio de la ruta 'bookings' que almacena localmente los objetos booking una vez hacemos click en el botón de confirmar del template
    @action
    saveBooking(){
        this.Bookings.saveBookingList();
        this.router.transitionTo('bookings');
    }
    
}
