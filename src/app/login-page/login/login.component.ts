import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PASSWORD_MIN_LENGTH } from 'src/app/consts';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/interfaces';
import { ParamsMapToMessages, COMMON_EMAIL_RE } from '../consts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  messages: Message[] = [];
  routeQueryParamsSub: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private messagesInit() {
    this.routeQueryParamsSub = this.route.queryParams.subscribe((params: Params) => {
      const messages: Message[] = [];
      const processibleParams = Object.keys(ParamsMapToMessages);

      for (let param of Object.keys(params)) {
        if (processibleParams.includes(param)) {
          messages.push({
            severity: ParamsMapToMessages[param].severity,
            detail: ParamsMapToMessages[param].detail
          })
        }
      }

      this.messages = messages;
    })
  }

  private formInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.pattern(COMMON_EMAIL_RE)
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)
      ]),
    });
  }

  ngOnInit(): void {
    this.messagesInit();
    this.formInit();
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const {email, password} = this.form.value;
    const user: User = {
      email,
      password,
    }

    this.authService.login(user);

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/selection'],  {
        queryParams: {
          doSearchByLetter: 'A'
        }
      });
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          invalidCredentials: true
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.routeQueryParamsSub.unsubscribe();
  }
}
