import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AirportsRoute extends Route {
    @service router;
    @service Airports;
    @service Application;

    init() {
        super.init(...arguments);
    }

    beforeModel(transition) {
        if (!this.Application.token) {
            this.router.transitionTo('/');
        } else {
            this.Airports.loadAirports();
        }
        return super.beforeModel(transition);
    }
}
