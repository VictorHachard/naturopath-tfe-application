import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ForgetComponent} from './components/forget/forget.component';
import {AccueilComponent} from './components/home/accueil.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TermsComponent} from './components/terms/terms.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
const routes: Routes = [
  { path: 'home', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
