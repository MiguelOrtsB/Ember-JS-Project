import EmberRouter from '@ember/routing/router';
import config from 'proyecto2/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home');
  this.route('form');
  this.route('list', {path: '/usuarios'});
});
