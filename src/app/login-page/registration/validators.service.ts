import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() {}

  crossFieldPasswordValidator: ValidatorFn =
    (form: AbstractControl): ValidationErrors | null => {
      const username = form.get('username');
      const email = form.get('email');
      const password = form.get('password');
      const usernameSeparator = /(?=[A-Z])| |\-/;
      const emailSeparator = /[\.\@]/;
      let forbiddenFragments = [];

      if (email.value) {
        forbiddenFragments = forbiddenFragments.concat(
          email.value.split(emailSeparator));
      }
      if (username.value) {
        forbiddenFragments = forbiddenFragments.concat(
          username.value.split(usernameSeparator));
      }

      if (password.value) {
        for (let fragment of forbiddenFragments) {
          if (password.value.includes(fragment)) {
            return {
              crossFieldPasswordValidator: {
                forbiddenPassword: true,
                forbiddenFragment: fragment
              }
            };
          }
        }
      }

      return null;
    };
}
