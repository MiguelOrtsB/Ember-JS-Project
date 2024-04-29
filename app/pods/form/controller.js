import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class FormController extends Controller {
  @service Form; // Si queremos mostrar el contenido de servicio (archivo service) en nuestro template tendremos que inyectarlo en nuestro controlador relacionado siempre
  @service router;

  @tracked country = "";
  @tracked name = "";

  // Función con el método 'filter' que retorna cada hotel de la HotelList que en su pais (country) incluya la palabra introducida por el usuario en el input (this.country) 
  @action
  onInputCountry(e) {
    this.country = e.target.value.toLowerCase();
    this.Form.hotelListSearch = this.Form.hotelList.filter(hotel => {
      return hotel.country.toLowerCase().includes(this.country);
    });
  }

  @action
  onInputName(e) {
    this.name = e.target.value.toLowerCase();
    this.Form.hotelListSearch = this.Form.hotelList.filter(hotel => {
      return hotel.name.toLowerCase().includes(this.name);
    });
  }

  @action
  hotelSearch(){
    let searchName;
    swal({
      text: 'Search for a hotel. e.g. "Hotel Isla Mallorca".',
      content: "input",
      button: {
        text: "Search!",
        closeModal: false,
      },
    })
    .then(name => {
      if (!name) throw null;
    
      // Convertimos el nombre a minúsculas para comparar sin distinción entre mayúsculas y minúsculas
      searchName = name.toLowerCase();
    
      return fetch(`/api/accommodations.json`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const hotels = data.accommodations;
      let hotelEncontrado = false;
      let resultadoHotel = null;

      for(let i = 0; i < hotels.length; i++){
        if(hotels[i].name.toLowerCase() == searchName){
            hotelEncontrado = true;
            resultadoHotel = hotels[i];
        }
      }
    
      if (!hotelEncontrado) {
        return swal("No hotel was found!");
      }
    
      const name = resultadoHotel.name;
      const imageURL = resultadoHotel.image;
      const stars = '⭐'.repeat(resultadoHotel.stars); // Convertir el número de estrellas en emojis
    
      swal({
        title: "Top result:",
        text: `${name} - ${stars}`,
        icon: imageURL,
      });
    })
    .catch(err => {
      if (err) {
        swal("Oh noes!", "The AJAX request failed!", "error");
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
  }
}






// @action
//   onInputCountry(e) {
//     this.country = e.target.value.toLowerCase();
//     for(let i = 0; i < this.Form.hotelList.length; i++){
//       let lowerCountry = this.Form.hotelList[i].country.toLowerCase();
//       if(lowerCountry.includes(this.country)){
//         this.Form.hotelListSearch = this.Form.hotelList.indexOf(this.Form.hotelList[i].country);
//       }
//     }
//     // this.router.transitionTo('form');
//   }