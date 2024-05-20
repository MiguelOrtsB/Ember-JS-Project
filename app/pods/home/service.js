import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HomeService extends Service {
    @tracked dontShowModal = false;
}
