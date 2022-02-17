import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { PASSWORD_MIN_LENGTH } from 'src/app/consts';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/interfaces';
import { ParamsMapToMessages } from './consts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private commonEmailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  form: FormGroup;
  messages: Message[] = [];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const messages: Message[] = [];
      const ProcessibleParams = Object.keys(ParamsMapToMessages);

      for (let param of Object.keys(params)) {
        if (ProcessibleParams.includes(param)) {
          messages.push({
            severity: ParamsMapToMessages[param].severity,
            detail: ParamsMapToMessages[param].detail
          })
        }
      }

      this.messages = messages;
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.pattern(this.commonEmailRe)
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)
      ]),
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.authService.login(user);

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/selection']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          invalidCredentials: true
        }
      });
    }
  }
}
