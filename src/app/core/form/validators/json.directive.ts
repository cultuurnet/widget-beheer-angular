import { AbstractControl } from '@angular/forms';

/**
 * A JSON string needs to be valid
 */
export function validJson(control: AbstractControl) {
  try {
    JSON.parse(control.value);
  } catch (e) {
    return { validJson: true };
  }

  return null;
}
