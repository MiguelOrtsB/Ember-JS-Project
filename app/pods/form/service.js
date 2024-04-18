import Service from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';

export default class FormService extends Service {
  @tracked hotelList = A(); // Trackeamos la lista de hoteles para que se asigne correctamente su valor y se actualice en las cargas de la página

  init() {
    super.init(...arguments);
    // this.loadHotelList();
  }

  async loadHotelList() {
    let response = await fetch('/api/accommodations.json');
    let { accommodations } = await response.json();
    this.hotelList = { accommodations }; // Es lo mismo (tracked manual) => set(this, "hotelList", { accommodations });
    console.log(this.hotelList);
  }
}
