import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';
import { A } from '@ember/array';
import $ from 'jquery';

export default class AirportsService extends Service {
    @service Application;

    @tracked airportsList = A();

    @tracked areAirportsStored = false;

    @tracked token;
    
    loadAirports() {
        if(this.areAirportsStored){
            this.airportsList = JSON.parse(localStorage.getItem('airports'));
        }else{
            let me = this; /* Con cualquier llamada asíncrona perdemos el scope (this), por eso iniciamos esta variable para que apunte a todo el archivo service y poder acceder a sus 
        variables y funciones. Por eso cuando estamos dentro de la llamada asíncrona (ajax, por ejemplo) utilizamos el 'me' para utilizar la variable 'airportsList', porque cuando
        está dentro el 'this' apunta sólo a la llamada ajax(/wsm/tka/airpoirts-by-roffice) siendo ese su scope, mientra que el 'me' su scope es todo el AirportsService general */
            let headers = {
                'x-application': 'tkairport',
                'x-appversion': 48.3277,
                'x-session-id': me.token
            };
            set(this, 'headers', headers);
            let data = this.getResortOfficePayload();
            let url = '/wsm/tka/airports-by-roffice';
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
                    console.log(response);
                    me.airportsList = response.rows;
                    localStorage.setItem('airports', JSON.stringify(me.airportsList));
                    me.areAirportsStored = true;
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    }

    getResortOfficePayload() {
        let payload = {
            action: 'extranet-client-airport-by-roffice',
            od_resortofficeid: 127,
            page: 1,
            start: 0,
            limit: 25
        };
        return payload;
    }

    getTokenFromSessionStorage() {
        let response = sessionStorage.getItem('token'); // Guardamos en un variable el JSON almacenado localmente en el navegador recuperando el valor asociado a la clave 'bookings'
        let convert = JSON.parse(response); // Lo parseamos a objetos Javascript
        this.token = convert.sessionid; // Los añadimos a la lista instanciada anteriormente
    }
}
