import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class NotFoundRoute extends Route {
    @service NotFound;

    init(){
        super.init(...arguments);
        console.log("Pasa por aquí 404")
        this.NotFound.notFoundError = true;
    }
}
