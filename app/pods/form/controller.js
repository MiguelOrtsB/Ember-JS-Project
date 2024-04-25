import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FormController extends Controller {
  @service Form; // Si queremos mostrar el contenido de servicio (archivo service) en nuestro template tendremos que inyectarlo en nuestro controlador relacionado siempre

  @action
  hotelSearch(){
    debugger
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
    
      // Convertimos el nombre a minúsculas para comparación sin distinción entre mayúsculas y minúsculas
      const searchName = name.toLowerCase();
    
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
    
      // Busca el hotel que coincida exactamente con el nombre proporcionado por el usuario
      const hotel = hotels.find(h => h.name.toLowerCase() === searchName);
    
      if (!hotel) {
        return swal("No hotel was found!");
      }
    
      const name = hotel.name;
      const imageURL = hotel.image;
      const stars = '⭐'.repeat(hotel.stars); // Convertir el número de estrellas en emojis
    
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
