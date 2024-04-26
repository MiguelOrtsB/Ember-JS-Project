import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';

export default class FormService extends Service {
  @tracked hotelList = A(); // Trackeamos la lista de hoteles para que se asigne correctamente su valor y se actualice en las cargas de la página

  @tracked hotelListSearch = A(); // Trackeamos la lista que contendrá los resultados de los filtros / búsqueda de los hoteles (será la lista final que se mostrará)

  init() {
    super.init(...arguments);
    // this.loadHotelList();
  }

  async loadHotelList() {
    let response = await fetch('/api/accommodations.json');
    // let { accommodations } = await response.json();
    let responseObject = await response.json(); // Recogemos el objeto "accommodations" con la lista de hoteles
    this.hotelList = responseObject.accommodations; // Asignamos a la variable la lista de hoteles del objeto | Es lo mismo (tracked manual) => set(this, "hotelList", { accommodations });
    this.hotelListSearch = this.hotelList; // Asignamos a la lista final la variable con la lista de hoteles
    console.log(this.hotelList);
  }
}
