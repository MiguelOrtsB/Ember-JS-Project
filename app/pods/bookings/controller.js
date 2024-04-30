import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import swal from 'sweetalert';
import pdfMake from 'ember-pdfmake';

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
      user: ''
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
      user: ''
    };
    this.Bookings.selectedBooking = newBooking2;
    this.router.transitionTo('bookings.booking-card', newBooking2);
  }

  @action
  eliminarBooking(booking){
    swal({
      title: "Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este Booking!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.Bookings.bookingList.removeObject(booking);
      } else {
        swal("Se ha cancelado la eliminación con éxito!");
      }
    });
  }

  // Método para crear el PDF con la información a cerca del Booking
  @action
  createPdf(booking) {
    let win = window.open('', '_blank');
    let precio = 0;
    for (let i = 0; i < this.Form.hotelList.length; i++) {
      if (this.Form.hotelList[i].id == booking.hotelId) {
        precio = this.Form.hotelList[i].price;
      }
    }

    // SOLUCIONAR LÓGICA PARA CALCULAR PRECIO TOTAL (DEBUGGEAR)
    let partesStartDate = booking.startDate.split('-');
    const añoStartDate = parseInt(partesStartDate[0], 10);
    const mesStartDate = parseInt(partesStartDate[1], 10) - 1; // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11
    const diaStartDate = parseInt(partesStartDate[2], 10);
    const fechaStartDate = new Date(añoStartDate, mesStartDate, diaStartDate);

    let partesEndDate = booking.endDate.split('-');
    const añoEndDate = parseInt(partesEndDate[0], 10);
    const mesEndDate = parseInt(partesEndDate[1], 10) - 1; // Restamos 1 al mes porque en JavaScript los meses van de 0 a 11
    const diaEndDate = parseInt(partesEndDate[2], 10);
    const fechaEndDate = new Date(añoEndDate, mesEndDate, diaEndDate);
  
    let precioTotal = (fechaEndDate - fechaStartDate) * precio;
    
    const documentDefinition = {
      content: [
        { text: 'Booking Information', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', '*', 'auto', 'auto', 'auto'],
            body: [
              ['Booking ID', 'Hotel ID', 'User', 'Start Date', 'End Date', 'Description', 'Pax', 'Price', 'Total Price'],
              [booking.id, booking.hotelId, booking.user, booking.startDate, booking.endDate, booking.description, booking.pax, precio + '€/per night', precioTotal + "€"]
            ]
          },
          layout: {
            hLineWidth: function(i, node) { return (i === 0 || i === node.table.body.length) ? 2 : 1; },
            vLineWidth: function(i, node) { return (i === 0 || i === node.table.widths.length) ? 2 : 1; },
            hLineColor: function(i, node) { return (i === 0 || i === node.table.body.length) ? 'black' : 'gray'; },
            vLineColor: function(i, node) { return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; },
            fillColor: function(i, node) { return (i === 0) ? '#CCCCCC' : null; }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open({}, win);
  }
}
