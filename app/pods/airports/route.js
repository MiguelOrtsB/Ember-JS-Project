import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AirportsRoute extends Route {
    @service router;

    init() {
        super.init(...arguments);
    }
    
    beforeModel(transition) {
    // if (this.Application.logedUser == null) {
        if (!sessionStorage.getItem('usuario')) {
            this.router.transitionTo('/');
        } else {
            return super.beforeModel(transition);
        }
    }
}
