import EmberRouter from '@ember/routing/router';
import config from 'proyecto2/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home');
  this.route('form', { path: '/accommodations' });
  this.route('list', { path: '/users' });
  this.route('bookings', function () {
    this.route('booking-card', { path: '/booking-card/:id' }); //La parte :id indica que esta ruta espera un parámetro dinámico en la URL llamado id. Este id podría ser cualquier identificador único que se use para identificar una reserva específica, por ejemplo, el ID de la reserva en la base de datos.
  });
  this.route('not-found', { path: '/*path' });
  this.route('airports');
});
