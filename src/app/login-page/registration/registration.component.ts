import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private validatorsService: ValidatorsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.usernameRe),
        Validators.minLength(8)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailRe)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.passwordRe),
        Validators.minLength(5)
      ]),
    }, {
      validators: this.validatorsService.crossFieldPasswordValidator
    });
  }


  submit() {
    if (this.form.invalid) {
      return;
    }
  }
}
