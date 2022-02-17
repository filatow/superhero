import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nanoid } from 'nanoid';
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH, USER_ID_LENGTH } from 'src/app/consts';
import { RegistryService } from 'src/app/services/registry.service';
import { User } from 'src/app/shared/interfaces';
import { ValidatorsService } from './validators.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private usernameRe = /^[a-z]+[A-Z][a-z]*$|^[A-Z][a-z]* [A-Z][a-z]*$|^[a-z]+\-[a-z]+$/;
  private emailRe = /^[\da-z]+(\.[\da-z]+){0,3}\@([a-z]{1,5}\.(co|com|net|org|us)$)/;
  private passwordRe = /^(?=.*\d)(?=.*[A-Z])(?=.*[!$%&\-.])[A-Za-z0-9!$%&\-.]*$/;
  form: FormGroup;

  constructor(
    private validatorsService: ValidatorsService,
    private registrationService: RegistryService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.usernameRe),
        Validators.minLength(USERNAME_MIN_LENGTH)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailRe),
        this.validatorsService.uniqueEmailValidator
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.passwordRe),
        Validators.minLength(PASSWORD_MIN_LENGTH)
      ]),
    }, {
      validators: this.validatorsService.crossFieldPasswordValidator
    });
  }


  signIn() {
    if (this.form.invalid) return;

    console.log(`this.form `, this.form);

    const newUser: User = {
      id: nanoid(USER_ID_LENGTH),
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.registrationService.register(newUser);
    this.form.reset();
  }
}
