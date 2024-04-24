import { helper } from '@ember/component/helper';

export function or(params /*, hash*/) {
  return params[0] || params[1] || params[2] || params[3];
}

export default helper(or);
