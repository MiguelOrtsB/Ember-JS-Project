import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WhatsNewFormComponent extends Component {
    @tracked isCheckboxChecked = false;
    
    @action
    showModal(element) {
        $(element).find('#exampleModalCenter').modal('show');
    }

    @action
    handleCheckboxChange(event) {
        this.isCheckboxChecked = event.target.checked;
        localStorage.setItem('showModalDialog', this.isCheckboxChecked ? 1 : 0);
    }
}
