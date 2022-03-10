import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login-page/login/login.component';
import { RegistrationComponent } from './login-page/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroSelectionPageComponent } from './hero-selection-page/hero-selection-page.component';
import { AlphaSelectComponent } from './hero-selection-page/alpha-select/alpha-select.component';
import { HoverClassNameDirective } from './directives/hover-class-name.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    RegistrationComponent,
    HeroSelectionPageComponent,
    AlphaSelectComponent,
    HoverClassNameDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ChipModule,
    PanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
