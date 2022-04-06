import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { Message } from 'primeng/api';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH, USER_ID_LENGTH } from 'src/app/consts';
import { RegistryService } from 'src/app/services/registry.service';
import { User } from 'src/app/shared/interfaces';
import { ValidatorsService } from '../../services/validators.service';
import { ParamsMapToMessages, USERNAME_RE, EMAIL_RE, PASSWORD_RE } from '../consts';

@Component({
  selector: 'app-registration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  form: FormGroup;
  redirectSub: Subscription;

  constructor(
    private validatorsService: ValidatorsService,
    private registrationService: RegistryService,
    private router: Router,
  ) { }

  private formInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern(USERNAME_RE),
        Validators.minLength(USERNAME_MIN_LENGTH)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EMAIL_RE),
        this.validatorsService.uniqueEmailValidator
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(PASSWORD_RE),
        Validators.minLength(PASSWORD_MIN_LENGTH)
      ]),
    }, {
      validators: this.validatorsService.crossFieldPasswordValidator
    });
  }

  getControl(controlName: string) {
    return this.form.get(controlName);
  }

  getControlErrors(controlName: string) {
    return this.form.get(controlName).errors;
  }

  ngOnInit(): void {
    this.formInit();
  }

  signUp() {
    if (this.form.invalid) return;

    const { username, email, password } = this.form.value;
    const newUser: User = {
      id: nanoid(USER_ID_LENGTH),
      username,
      email,
      password
    }

    this.registrationService.registerUser(newUser);
    this.form.reset();

    const { severity, detail } = ParamsMapToMessages.accountWasCreated;
    this.messages.push({
      severity,
      detail
    });

    this.redirectSub = of(true).pipe(delay(5000)).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.redirectSub) {
      this.redirectSub.unsubscribe();
    }
  }
}
