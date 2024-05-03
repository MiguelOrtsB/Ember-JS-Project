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
        this.Bookings.saveBookingList();
      } else {
        swal("Se ha cancelado la eliminación con éxito!");
      }
    });
  }

  // Método para crear el PDF con toda la información a cerca del Booking
  @action
  createPdf(booking) {
    let win = window.open('', '_blank');

    // Calculamos el precio del Booking
    let precio = 0;
    for (let i = 0; i < this.Form.hotelList.length; i++) {
      if (this.Form.hotelList[i].id == booking.hotelId) {
        precio = this.Form.hotelList[i].price;
      }
    }

    // Calculamos la fecha actual
    let fecha = new Date();
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();
    let actualDate = year.toString() + "-0" + month.toString() + "-0" + day.toString();
    // let tiempoTranscurrido = Date.now();
    // let hoy = new Date(tiempoTranscurrido);
    // let actual = hoy.toLocaleDateString();

    // Calculamos la cantidad de dias del Booking
    let fecha1 = new Date(booking.startDate);
    let fecha2 = new Date(booking.endDate);

    let diferencia = fecha2.getTime() - fecha1.getTime(); // Calculamos la diferencia en milisegundos
    let dias = Math.abs(Math.round(diferencia / (1000 * 60 * 60 * 24))); // Convertimos la diferencia de milisegundos a días

    // Calculamos el precio total del Booking
    let precioTotal = dias * precio;
    
    // Creamos el contenido del PDF
    const documentDefinition = {
      info: {
      title: 'Booking Information', 
      author: 'MTS Globe', 
      subject: 'Booking information', 
    },
    content: [
      // Encabezado de la factura
      {
        columns: [
          {
            image: 'data:image/png;base64,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',
            width: 150
          },
          {
            text: 'Booking Information', 
            fontSize: 24,
            bold: true,
            alignment: 'right',
            margin: [0, 0, 0, 0]
          }
        ]
      },
      {
        text: [
          'Fecha de expedición: ', {text: actualDate, bold: true}, '\n',
          'ID de Booking: ', {text: booking.id, bold: true}, '\n',
          'ID de Hotel: ', {text: booking.hotelId, bold: true}, '\n',
          'Check-in : ', {text: booking.startDate, bold: true}, '\n', 
          'Check-out : ', {text: booking.endDate, bold: true},
        ],
        style: 'header',
      },
      {
        text: 'Cliente: ' + booking.user, 
        fontSize: 12,
        margin: [0, 0, 0, 10] 
      },
      {
        text: 'Dirección: Dirección de ejemplo',
        fontSize: 12,
        margin: [0, 0, 0, 10] 
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [{text: 'Descripción', bold: true}, 'Cantidad pax', 'Cantidad noches', 'Precio/noche', 'Total'],
            ['Reserva', booking.pax, dias, precio + '€', precioTotal + '€'],
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20] 
      },
      {
        table: {
          headerRows: 1,
          widths: ['*'],
          body: [
            [{text: 'Comentarios', bold: true}],
            [booking.description],
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20] 
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [{text: 'Extras', bold: true}, 'Cantidad pax', 'Cantidad/pers', 'Precio/pers', 'Total'],
            ['Transfer', '-', '-', '-', '-'],
            ['Parking', '-', '-', '-', '-'],
            ['Spa & Wellness', '-', '-', '-', '-'],
            ['Catering', '-', '-', '-', '-'],
            ['Excursiones', '-', '-', '-', '-'],
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20] 
      },
      // Total de la factura
      {
        text: 'Total: ' + precioTotal + "€", 
        fontSize: 14,
        bold: true,
        alignment: 'right',
        margin: [0, 0, 0, 20] 
      },
      {
        text: 'Para cualquier duda: ',
        alignment: 'center'
      },
      {
        alignment: 'center',
        columns: [
          {
            text: 'Código QR',
            bold: true,
            margin: [0, 10, 0, 0]
          }
        ]
      },
      {
        qr: 'https://mtsglobe.com/',
        fit: 150,
        foreground: 'red',
        alignment: 'center',
        margin: [0, 20, 0, 0]
      }
    ],
      footer: {
        columns: [
          { text: 'Carrer del Fluvià, 1, 1 + 3º izda, Llevant, 07009 Palma, Illes Balears', alignment: 'center', fontSize: 10 },
          { text: 'Teléfono: +34 871170555', alignment: 'center', fontSize: 10 }
        ],
        margin: [40, 10, 40, 0], 
      },
      styles: {
        header: {
          fontSize: 12,
          alignment: 'right',
          margin: [0, 0, 0, 10] 
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open({}, win);
  }
}



















// content: [
//   { text: 'Booking Information', style: 'header' },
//   {
//     table: {
//       headerRows: 1,
//       widths: ['auto', 'auto', 'auto', 'auto', 'auto', '*', 'auto', 'auto', 'auto'],
//       body: [
//         ['Booking ID', 'Hotel ID', 'User', 'Start Date', 'End Date', 'Description', 'Pax', 'Price', 'Total Price'],
//         [booking.id, booking.hotelId, booking.user, booking.startDate, booking.endDate, booking.description, booking.pax, precio + '€/per night', precioTotal + "€"]
//       ]
//     },
//     layout: {
//       hLineWidth: function(i, node) { return (i === 0 || i === node.table.body.length) ? 2 : 1; },
//       vLineWidth: function(i, node) { return (i === 0 || i === node.table.widths.length) ? 2 : 1; },
//       hLineColor: function(i, node) { return (i === 0 || i === node.table.body.length) ? 'black' : 'gray'; },
//       vLineColor: function(i, node) { return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'; },
//       fillColor: function(i, node) { return (i === 0) ? '#CCCCCC' : null; }
//     }
//   }
// ],
// styles: {
//   header: {
//     fontSize: 18,
//     bold: true,
//     alignment: 'center',
//     margin: [0, 0, 0, 10]
//   }
// }
// };