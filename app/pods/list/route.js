import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ListRoute extends Route {
    @service router;
    @service Application;

    init() {
        super.init(...arguments);
    }

    // Función que es la primera que se ejecuta cuando se carga la ruta 'home' y comprubea si el usuario se ha registrado para evitar que acceda a ella 
    beforeModel(transition) {
        if (this.Application.logedUser == null) {
        this.router.transitionTo('/');
        } else {
        return super.beforeModel(transition);
        }
    }
}
