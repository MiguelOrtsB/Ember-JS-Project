import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeController extends Controller {
  @service Application;

  @action
  onClickLogout() {
    // let applicationController = this.controllerFor('Application'); //Variable que recoge nuestro controlador para poder usar sus funciones y demás
    // applicationController.showUserList();
    // console.log(applicationController.logedUser);
    // applicationController.logedUser.shift();
  }
}
