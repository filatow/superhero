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
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login-page/login/login.component';
import { RegistrationComponent } from './login-page/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroSelectionPageComponent } from './hero-selection-page/hero-selection-page.component';
import { AlphaSelectComponent } from './hero-selection-page/alpha-select/alpha-select.component';
import { HoverClassNameDirective } from './directives/hover-class-name.directive';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { UserHeroesComponent } from './user-info-page/user-heroes/user-heroes.component';
import { HeroInfoPageComponent } from './hero-info-page/hero-info-page.component';
import { PowerupsComponent } from './user-info-page/powerups/powerups.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    RegistrationComponent,
    HeroSelectionPageComponent,
    AlphaSelectComponent,
    HoverClassNameDirective,
    HeaderComponent,
    UserHeroesComponent,
    HeroInfoPageComponent,
    UserInfoPageComponent,
    PowerupsComponent
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
    TabViewModule,
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
