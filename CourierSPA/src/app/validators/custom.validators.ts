import { AbstractControl } from '@angular/forms';
export function phoneValidator(control: AbstractControl): {[key:string]:boolean} | null {
    if (!control.value.match(/^[0-9]+$/)) {
      return { 'isPhoneValid': true };
    }
    return null;
}
