import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service Application;

  init() {
    super.init(...arguments);
    console.log('initRoute');
  }

  beforeModel() {
    if (sessionStorage.getItem('usuario')) {
      this.router.transitionTo('home');
      this.Application.logedUser = true;
    }
  }

  async model() {
    // this.Application.loadUserList();
    // let response = await fetch('/api/users.json');
    console.log(this.Application.serviceVariable);
    let applicationController = this.controllerFor('Application'); //Variable que recoge nuestro controlador para poder usar sus funciones y demás
    console.log(applicationController.controllerVariable);
    applicationController.showUserList();
    // let data = await response.json();
    // this.Application.userList = data;
    // console.log(data);

    // return data;
  }

  //   async beforeModel(transition) {
  //     console.log("beforeModel");
  //     let response = await fetch('/api/users.json');
  //     console.log(this.Application.cualquierCosa);
  //     let applicationController = this.controllerFor('Application'); //Variable que recoge nuestro controlador
  //     console.log(applicationController.otraCosa);

  //     let data = await response.json();
  //     this.Application.userList = data;
  //     console.log(data);

  //     applicationController.showUserList();
  //   }
}
