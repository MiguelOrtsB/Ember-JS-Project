import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import swal from 'sweetalert';
import $ from 'jquery'; 

export default class ApplicationController extends Controller {
  // Inyectamos los servicios para acceder a las propiedades de router de Ember y para poder acceder al contenido del servicio de Application
  @service router;
  @service Application;

  controllerVariable = 'Variable inicializada en Controller';

  // Variables que almacenarán usuario y contraseña y reasignarán su valor dinámicamente
  @tracked username = '';
  @tracked password = '';

  @tracked button = null;

  @tracked asynchronous = null;

  // Función que se inicia automáticamente al cargar la página (la primera de todas)
  init() {
    super.init(...arguments);
    console.log('initController');
  }

  // Función para mostrar la lista de usuarios
  showUserList() {
    console.log(this.Application.userList);
  }

  // Función con la acción para reasignar el valor del nombre de usuario introducidas en el input del template
  @action
  onInputUsername(e) {
    this.username = e.target.value;
  }

  // Función con la accion para reasignar el valor de la contraseña introducidas en el input del template
  @action
  onInputPassword(e) {
    this.password = e.target.value;
  }

  // Función con la acción con la lógica para comprobar si el usuario y contraseña son correctos una vez hecho click en el botón de iniciar sesión
  @action
  onClickLogin() {
    let logged = false;
    for (let i = 0; i < this.Application.userList.length; i++) {
      const user = this.Application.userList[i];
      if (user.username == this.username && user.password == this.password) {
        logged = true;
        this.Application.logedUser = user;
        sessionStorage.setItem(
          'usuario',
          JSON.stringify(this.Application.logedUser.username)
        ); // Guardamos la sesión con el usuario actual
      }
    }
    if (logged) {
      this.router.transitionTo('home');
    } else {
      swal('Error', 'Nombre de usuario o contraseña incorrectos.', 'error');
      this.Application.logedUser = null;
      this.router.transitionTo('/');
    }
  }

  // Función para cerrar sesión y regresar a la página de Login
  @action
  onClickLogout() {
    this.Application.logedUser = null;
    sessionStorage.removeItem('usuario'); // Eliminamos la sesión del usuario actual
    this.router.transitionTo('/');
  }

  get isLoggedIn() {
    // Verifica si hay un usuario en la sesión
    return sessionStorage.getItem('usuario');
  }

  // Comunicación asíncrona con FETCH consumiendo directamente una promesa

  @action
  consumiendoPromesaFetch(){
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log("Primera promesa");
        return response.json(); // Este método devuelve una promesa que se resolverá con el JSON parseado. Al usar return, pasamos esta promesa al siguiente then.
      })
      .then(data => {
        console.log("Segunda promesa");
        data.forEach(element => {
          console.log(element);
        });
        let userId6 = data.filter(element => element.userId === 6);
        console.log("Registros con User ID 6: ", userId6);
        let id56 = data.find(element => element.id === 56);
        this.asynchronous = JSON.stringify(id56);
        console.log("Registro con ID 56: ", id56);
      })
      .finally(() => {
        console.log("Esto es el finally. Y ya hemos terminado");
      })
      .catch(error => {
        console.log(error);
      });
      console.log("Este es el último console log");
  }

  // Comunicación asíncrona con AJAX creando y consumiendo las promesas
  
  creandoPromesaAjax() {
    return new Promise(async (resolve, reject) => {
      let url = 'https://jsonplaceholder.typicode.com/posts';
      $.ajax({
        method: 'GET',
        url: url,
        success: function(response){
          resolve(response);
          console.log("Respuesta: ", response);
        },
        error: function(error){
          reject(error);
          console.log("Error: ", error);
        }
      })
      console.log("Esto es el último console log de la creación de la promesa");
    });
  }

  @action
  consumiendoPromesaAjax(){
    return new Promise(async (resolve, reject) => {
      this.creandoPromesaAjax()
      .then(response => {
        resolve(response);
        let userId8 = response.filter(element => element.userId === 8);
        this.asynchronous = "AJAX";
        console.log("Registros con User ID 8: ", userId8);
      })
      .catch(error => {
        reject(error);
      })
      console.log("Esto es el último console log consumiendo la promesa")
    });
  }
}
