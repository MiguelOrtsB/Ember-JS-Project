import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default class FormController extends Controller {
    @service Form; // Si queremos mostrar el contenido de servicio (archivo service) en nuestro template tendremos que inyectarlo en nuestro controlador relacionado siempre
}
