import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccueilComponent} from './components/home/accueil.component';
import {HttpClientModule} from '@angular/common/http';
import {PagesComponent} from './components/pages/pages.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ForgetComponent} from './components/forget/forget.component';
import {TermsComponent} from './components/terms/terms.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {SettingsComponent} from './components/settings/settings.component';
import {PageComponent} from './components/page/page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditpageComponent} from './components/addpage/editpage.component';
import {AddpageComponent} from './components/addpageselectcategory/addpage.component';
import { AddtagComponent } from './components/addtag/addtag.component';
import { EdittagComponent } from './components/edittag/edittag.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    PagesComponent,
    RegisterComponent,
    LoginComponent,
    ForgetComponent,
    TermsComponent,
    PrivacyComponent,
    SettingsComponent,
    PageComponent,
    EditpageComponent,
    AddpageComponent,
    AddtagComponent,
    EdittagComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
