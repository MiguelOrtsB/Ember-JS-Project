import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';
import swal from 'sweetalert';

export default class BookingsBookingCardController extends Controller {
  @service Bookings;
  @service router;
  @service Form;

  // Propiedad que asignará el objeto booking seleccionado en el template para editarlo aquí en booking-card (se asigna en el route)
  @tracked booking = null;

  // Propiedades para calcular la fecha actual y convertirla a 'string'
  @tracked fecha = new Date();
  @tracked year = null;
  @tracked day = null;
  @tracked month = null;
  @tracked actualDate = null;

  init(){
    super.init(...arguments);
    // Calculamos fecha actual y la parseamos a string para poder compararla con el formato de las fechas de la lista de Bookings
    this.year = this.fecha.getFullYear();
    this.month = this.fecha.getMonth() + 1;
    this.day = this.fecha.getDate();
    this.actualDate = this.year.toString() + "-0" + this.month.toString() + "-" + this.day.toString();
  }
  

  // Seteamos los campos introducidos en los inputs del formulario como nuevo valor
  @action
  onInputStartDate(e) {
    console.log(e.target.value);
    set(this.Bookings.selectedBooking, 'startDate', e.target.value);
  }

  @action
  onInputHotelId(e) {
    set(this.Bookings.selectedBooking, 'hotelId', e.target.value);
  }

  @action
  onInputEndDate(e) {
    set(this.Bookings.selectedBooking, 'endDate', e.target.value);
  }

  @action
  onInputDescription(e) {
    // this.Bookings.selectedBooking.description = e.target.value;
    set(this.Bookings.selectedBooking, 'description', e.target.value);
  }

  @action
  onInputPax(e) {
    set(this.Bookings.selectedBooking, 'pax', e.target.value);
  }

  // Asignamos dinámicamente el Booking ID introducido que queremos eliminar
  @action
  onInputBookingId(e) {
    set(this.Bookings, "selectedBooking", this.Bookings.bookingList.findBy("id", e.target.value));
  }

  // Función que imprime las dos formas de llamar al parámetro (objeto booking) pasado en la ruta, el cuál es el que se quiere editar
  showVars() {
    console.log(this.booking);
    console.log(this.Bookings.selectedBooking);
  }

  // Función que llama a otra del servicio de la ruta 'bookings' que almacena localmente los objetos booking una vez hacemos click en el botón de confirmar del template
  @action
  saveBooking() {
    let arrayId = []; // Iniciamos array vacío que contendrá los ID's de la lista de Bookings
    let biggerNumber = 0; // Variable para calcular el nuevo ID incremental
    console.log(this.Bookings.createBooking);
    // Si los campos del formulario están vacíos, no permite crear nuevo Booking y muestra mensaje de error
    if (
      this.Bookings.selectedBooking.hotelId == '' ||
      this.Bookings.selectedBooking.startDate == '' ||
      this.Bookings.selectedBooking.endDate == '' ||
      this.Bookings.selectedBooking.pax == ''
    ) {
      swal("Warning", "Debes rellenar los campos correctamente para crear un nuevo Booking.", "warning");
    // Validaciones para comprobar que las fecha sean correctas
    }else if(this.Bookings.selectedBooking.startDate > this.Bookings.selectedBooking.endDate) {
      swal("Warning", "No se puede seleccionar una fecha de salida anterior a la fecha de entrada", "warning");
    }else if(this.actualDate > this.Bookings.selectedBooking.startDate || this.actualDate > this.Bookings.selectedBooking.endDate){
      debugger
      swal("Warning", "No se puede seleccionar una fecha pasada", "warning");
    }else {
      if (this.Bookings.createBooking) {
        // Comprobamos la variable reactiva del Application, si está en 'true' es que queremos crear nuevo Booking, y si en 'false' editar uno existente
        for (let i = 0; i < this.Bookings.bookingList.length; i++) {
          arrayId.push(this.Bookings.bookingList[i].id); // Recorremos la lista de Bookings y introducimos los ID's en el array creado anteriormente
        }
        biggerNumber = Math.max(...arrayId); // Calculamos el número más grande del array de ID's
        let newId = biggerNumber + 1; // Y le incrementamos en 1 el valor y se lo asignamos a la variable creada en el service de la ruta Booking
        // this.Bookings.newBooking = {
        //   // Creamos el nuevo Booking con su ID incremental y con los valores recogidos de los inputs del template
        //   id: this.Bookings.newId,
        //   hotelId: this.Bookings.selectedBooking.hotelId,
        //   startDate: this.Bookings.selectedBooking.startDate,
        //   endDate: this.Bookings.selectedBooking.endDate,
        //   description: this.Bookings.selectedBooking.description,
        //   pax: this.Bookings.selectedBooking.pax,
        // };
        this.Bookings.selectedBooking.id = newId.toString(); // Convertimos el ID en string (porque así están guardados en la lista)
        // this.Bookings.bookingList.push(this.Bookings.newBooking); 
        this.Bookings.bookingList.pushObject(this.Bookings.selectedBooking); // Y lo pusheamos a la lista que contiene todos los Bookings
      } else {
        // AQUÍ IRÁ LA LÓGICA PARA CUANDO EDITEMOS LOS BOOKINGS
      }
    }
    this.Bookings.saveBookingList(); // Y lo guardamos con esta función
    this.router.transitionTo('bookings');
  }

  @action
  deleteBooking() {
    if (this.Bookings.selectedBooking.id == null) {
      swal("Warning", "Debes introducir el ID del Booking", "warning");
    }else{
      swal("Warning", "Estás seguro que lo quieres eliminar?", "warning"); // IMPLEMENTAR QUE CUANDO SE QUIERA ELIMINAR PREGUNTAR AL USUARIO SI SEGUIR ADELANTE O CANCELAR!!!!
      this.Bookings.bookingList.removeObject(this.Bookings.selectedBooking);
      // for (let i = 0; i < this.Bookings.bookingList.length; i++) {
      // if(this.Bookings.bookingList[i].id == this.Bookings.selectedBooking.id){
      //   this.Bookings.bookingList.splice(i, 1); // Elimina el elemento en la posición 'i'
      //   break;
      // }
    // }
    }
    this.Bookings.saveBookingList(); // Y lo guardamos con esta función
    this.router.transitionTo('bookings');
  }

  @action
  cancel(){
    this.router.transitionTo('bookings');
  }
}
