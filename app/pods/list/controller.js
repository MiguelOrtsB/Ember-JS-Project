import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ListController extends Controller {
    @service Application;
}
