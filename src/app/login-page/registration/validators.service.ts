import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RegistryService } from 'src/app/services/registry.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private registryService: RegistryService) {}

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

  uniqueEmailValidator: ValidatorFn =
  (email: AbstractControl): ValidationErrors | null => {
    const isUnique = this.registryService.isEmailUnique(email.value);

    if (!isUnique) {
      return {
        uniqueEmailValidator: {
          uniqueEmail: false,
        }
      };
    }

    return null;
  }
}
