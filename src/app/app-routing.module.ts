import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/templates/login/login.component';
import {RegisterComponent} from './components/templates/register/register.component';
import {ForgetComponent} from './components/templates/forget/forget.component';
import {AccueilComponent} from './components/templates/home/accueil.component';
import {SettingsComponent} from './components/templates/settings/settings.component';
import {TermsComponent} from './components/templates/terms/terms.component';
import {PrivacyComponent} from './components/templates/privacy/privacy.component';
import {PageComponent} from './components/templates/page/page.component';
import {PagesComponent} from './components/templates/pages/pages.component';
import {EditpageComponent} from './components/templates/edit/editpage/editpage.component';
import {AddpageComponent} from './components/templates/add/addpage/addpage.component';
import {AddtagComponent} from './components/templates/add/addtag/addtag.component';
import {EdittagComponent} from './components/templates/edit/edittag/edittag.component';
import {ContactComponent} from './components/templates/contact/contact.component';
import {EditcategoryComponent} from './components/templates/edit/editcategory/editcategory.component';
import {AddcategoryComponent} from './components/templates/add/addcategory/addcategory.component';
import {AdmincategoriesComponent} from './components/templates/admin/admincategories/admincategories.component';

const routes: Routes = [
  { path: 'home', component: AccueilComponent },
  { path: 'contact', component: ContactComponent },
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
  { path: 'addtag', component: AddtagComponent },
  { path: 'editcategory/:id', component: EditcategoryComponent },
  { path: 'addcategory', component: AddcategoryComponent },
  { path: 'admincategories', component: AdmincategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
