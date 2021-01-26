import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ForgetComponent} from './components/forget/forget.component';
import {AccueilComponent} from './components/home/accueil.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TermsComponent} from './components/terms/terms.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {PageComponent} from './components/page/page.component';
import {PagesComponent} from './components/pages/pages.component';
import {EditpageComponent} from './components/addpage/editpage.component';
import {AddpageComponent} from './components/addpageselectcategory/addpage.component';
import {AddtagComponent} from './components/addtag/addtag.component';
import {EdittagComponent} from './components/edittag/edittag.component';

const routes: Routes = [
  { path: 'home', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'page/:id', component: PageComponent },
  { path: 'pages', component: PagesComponent },
  { path: 'pages/:id', component: PagesComponent },
  { path: 'editpage/:id', component: EditpageComponent },
  { path: 'addpage', component: AddpageComponent },
  { path: 'edittag/:id', component: EdittagComponent },
  { path: 'addtag', component: AddtagComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
