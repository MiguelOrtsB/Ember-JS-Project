import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { set, get } from '@ember/object';
import swal from 'sweetalert';
import $ from 'jquery';

export default class ApplicationController extends Controller {
  // Inyectamos los servicios para acceder a las propiedades de router de Ember y para poder acceder al contenido del servicio de Application
  @service router;
  @service Application;

  controllerVariable = 'Variable inicializada en Controller';

  headers = null;

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

  // Función con la acción con la lógica para comprobar si el usuario y contraseña son correctos una vez hecho click en el botón de iniciar sesión (NO EN USO)
  // @action
  // onClickLogin() {
  //   let logged = false;
  //   for (let i = 0; i < this.Application.userList.length; i++) {
  //     const user = this.Application.userList[i];
  //     if (user.username == this.username && user.password == this.password) {
  //       logged = true;
  //       this.Application.logedUser = user;
  //       sessionStorage.setItem(
  //         'usuario',
  //         JSON.stringify(this.Application.logedUser.username)
  //       ); // Guardamos la sesión con el usuario actual
  //     }
  //   }
  //   if (logged) {
  //     this.router.transitionTo('home');
  //   } else {
  //     swal('Error', 'Nombre de usuario o contraseña incorrectos.', 'error');
  //     this.Application.logedUser = null;
  //     this.router.transitionTo('/');
  //   }
  // }

  // Función para cerrar sesión y regresar a la página de Login
  @action
  onClickLogout() {
    this.Application.token = null;
    sessionStorage.removeItem('usuario'); // Eliminamos la sesión del usuario actual
    sessionStorage.removeItem('token');
    this.router.transitionTo('/');
  }

  get isLoggedIn() {
    // Verifica si hay un usuario en la sesión
    return sessionStorage.getItem('usuario');
  }

  // Ejemplo comunicación asíncrona con FETCH consumiendo directamente una promesa

  @action
  consumiendoPromesaFetch() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        console.log('Primera promesa');
        return response.json(); // Este método devuelve una promesa que se resolverá con el JSON parseado. Al usar return, pasamos esta promesa al siguiente then.
      })
      .then((data) => {
        console.log('Segunda promesa');
        data.forEach((element) => {
          console.log(element);
        });
        let userId6 = data.filter((element) => element.userId === 6);
        console.log('Registros con User ID 6: ', userId6);
        let id56 = data.find((element) => element.id === 56);
        this.asynchronous = JSON.stringify(id56);
        console.log('Registro con ID 56: ', id56);
      })
      .finally(() => {
        console.log('Esto es el finally. Y ya hemos terminado');
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('Este es el último console log');
  }

  // Ejemplo comunicación asíncrona con AJAX creando y consumiendo las promesas

  creandoPromesaAjax() {
    return new Promise(async (resolve, reject) => {
      let url = 'https://jsonplaceholder.typicode.com/posts';
      $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        success: function (response) {
          resolve(response);
          console.log('Respuesta: ', response);
        },
        error: function (error) {
          reject(error);
          console.log('Error: ', error);
        },
      });
      console.log('Esto es el último console log de la creación de la promesa');
    });
  }

  @action
  consumiendoPromesaAjax() {
    return new Promise(async (resolve, reject) => {
      this.creandoPromesaAjax()
        .then((data) => {
          let id11 = data.find((element) => element.id === 11);
          this.asynchronous = JSON.stringify(id11);
          console.log('Registro con ID 11: ', id11);
          resolve(id11);
        })
        .catch((error) => {
          reject(error);
        });
      console.log('Esto es el último console log consumiendo la promesa');
    });
  }

  // <--------------------------------------------------------------- LOGIN REAL SERVICIO TKAIRPORT ----------------------------------------------------------------------->

  @action
  login() {
    let { username, password } = this;

    let credentials = {
      identification: username,
      password: password,
    };

    this.loginEsb(credentials)
      .then((data) => {
        this.Application.token = data;
        sessionStorage.setItem('token', JSON.stringify(this.Application.token));
        this.router.transitionTo('home');
        
      })
      .catch((error) => {
        console.log(error);
        swal('Error', 'Nombre de usuario o contraseña incorrectos.', 'error');
        this.router.transitionTo('/');
      });
  }

  loginEsb(credentials) {
    return new Promise(async (resolve, reject) => {
      // let me = this;
      let headers = {
        'x-application': 'tkairport',
      };
      set(this, 'headers', headers);
      let data = this.getAuthenticateData(credentials);
      let url = '/wsm/tka/login';
      $.ajax({
        method: 'POST',
        url: url,
        data: data,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        beforeSend: function (xhr, settings) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        },
        headers: headers,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  getAuthenticateData(credentials) {
    var username = credentials.identification,
      password = credentials.password || 'xx',
      authentication = {
        action: 'login',
      };

    //** our authorization goes in the header
    this.headers.authorization =
      'Basic ' + this.encode(username + ':' + password);

    return authentication;
  }

  encode(decStr) {
    if (typeof btoa === 'function') {
      return btoa(decStr);
    }
    var base64s =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var bits;
    var dual;
    var i = 0;
    var encOut = '';
    while (decStr.length >= i + 3) {
      bits =
        ((decStr.charCodeAt(i++) & 0xff) << 16) |
        ((decStr.charCodeAt(i++) & 0xff) << 8) |
        (decStr.charCodeAt(i++) & 0xff);
      encOut +=
        base64s.charAt((bits & 0x00fc0000) >> 18) +
        base64s.charAt((bits & 0x0003f000) >> 12) +
        base64s.charAt((bits & 0x00000fc0) >> 6) +
        base64s.charAt(bits & 0x0000003f);
    }
    if (decStr.length - i > 0 && decStr.length - i < 3) {
      dual = Boolean(decStr.length - i - 1);
      bits =
        ((decStr.charCodeAt(i++) & 0xff) << 16) |
        (dual ? (decStr.charCodeAt(i) & 0xff) << 8 : 0);
      encOut +=
        base64s.charAt((bits & 0x00fc0000) >> 18) +
        base64s.charAt((bits & 0x0003f000) >> 12) +
        (dual ? base64s.charAt((bits & 0x00000fc0) >> 6) : '=') +
        '=';
    }
    return encOut;
  }
}
