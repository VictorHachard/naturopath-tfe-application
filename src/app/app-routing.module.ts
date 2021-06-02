import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/templates/user/login/login.component';
import {RegisterComponent} from './components/templates/user/register/register.component';
import {ForgetComponent} from './components/templates/user/forget/forget.component';
import {AccueilComponent} from './components/templates/home/accueil.component';
import {SettingsComponent} from './components/templates/user/settings/settings.component';
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
import {EdittagtypeComponent} from './components/templates/edit/edittagtype/edittagtype.component';
import {AddtagtypeComponent} from './components/templates/add/addtagtype/addtagtype.component';
import {AdmintagtypesComponent} from './components/templates/admin/admintagtypes/admintagtypes.component';
import {EditparagraphtypeComponent} from './components/templates/edit/editparagraphtype/editparagraphtype.component';
import {AddparagraphtypeComponent} from './components/templates/add/addparagraphtype/addparagraphtype.component';
import {AdminparagraphtypesComponent} from './components/templates/admin/adminparagraphtypes/adminparagraphtypes.component';
import {AdminparatagtypesComponent} from './components/templates/admin/adminparatagtypes/adminparatagtypes.component';
import {AddparatagtypeComponent} from './components/templates/add/addparatagtype/addparatagtype.component';
import {AdminparapagetypesComponent} from './components/templates/admin/adminparapagetypes/adminparapagetypes.component';
import {AddparapagetypeComponent} from './components/templates/add/addparapagetype/addparapagetype.component';
import {EditparapagetypeComponent} from './components/templates/edit/editparapagetype/editparapagetype.component';
import {EditparatagtypeComponent} from './components/templates/edit/editparatagtype/editparatagtype.component';
import {ResetComponent} from './components/actions/reset/reset.component';
import {ConfirmComponent} from './components/actions/confirm/confirm.component';
import {DeleteComponent} from './components/actions/delete/delete.component';
import {AuthGuardService, NotAuthGuardService} from './service/guards/auth-guard.service';
import {DashboardComponent} from './components/templates/dashboard/dashboard.component';
import {EditimageComponent} from './components/templates/edit/editimage/editimage.component';
import {AddimageComponent} from './components/templates/add/addimage/addimage.component';
import {TicketComponent} from './components/templates/ticket/ticket.component';
import {AdminticketComponent} from './components/templates/admin/adminticket/adminticket.component';
import {RolesGuardAdminService, RolesGuardOwnerService} from './service/guards/roles-guard.service';
import {AdminimagesComponent} from './components/templates/admin/adminimages/adminimages.component';
import {AdminpagesComponent} from './components/templates/admin/adminpages/adminpages.component';
import {AdmintagsComponent} from './components/templates/admin/admintags/admintags.component';
import {SearchComponent} from './components/templates/search/search.component';
import {FavoriteComponent} from './components/templates/favorite/favorite.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pages'},
  { path: 'home', pathMatch: 'full', redirectTo: 'pages'},
  { path: 'home', component: AccueilComponent },

  { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService] },
  { path: 'ticket', component: TicketComponent, canActivate: [AuthGuardService] },
  { path: 'ticket/:id', component: TicketComponent, canActivate: [AuthGuardService] },
  { path: 'adminticket', component: AdminticketComponent, canActivate: [RolesGuardAdminService] },
  { path: 'adminticket/:id', component: AdminticketComponent, canActivate: [RolesGuardAdminService] },

  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'forget', component: ForgetComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },

  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'settings/:param', component: SettingsComponent, canActivate: [AuthGuardService] },

  { path: 'page/:id', component: PageComponent },

  { path: 'pages', component: PagesComponent },
  { path: 'pages/:id', component: PagesComponent },
  { path: 'pages/:id/:index', component: PagesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:str', component: SearchComponent },

  { path: 'favorite', component: FavoriteComponent },

  { path: 'editpage/:id', component: EditpageComponent, canActivate: [AuthGuardService] },
  { path: 'addpage', component: AddpageComponent, canActivate: [AuthGuardService] },
  { path: 'adminpages', component: AdminpagesComponent, canActivate: [AuthGuardService] },

  { path: 'edittag/:id', component: EdittagComponent, canActivate: [AuthGuardService] },
  { path: 'addtag', component: AddtagComponent, canActivate: [AuthGuardService] },
  { path: 'admintags', component: AdmintagsComponent, canActivate: [AuthGuardService] },

  { path: 'editimage/:id', component: EditimageComponent, canActivate: [AuthGuardService] },
  { path: 'addimage', component: AddimageComponent, canActivate: [AuthGuardService] },
  { path: 'adminimages', component: AdminimagesComponent, canActivate: [AuthGuardService] },

  { path: 'editcategory/:id', component: EditcategoryComponent, canActivate: [AuthGuardService] },
  { path: 'addcategory', component: AddcategoryComponent, canActivate: [AuthGuardService] },
  { path: 'admincategories', component: AdmincategoriesComponent, canActivate: [RolesGuardOwnerService] },

  { path: 'edittagtype/:id', component: EdittagtypeComponent, canActivate: [AuthGuardService] },
  { path: 'addtagtype', component: AddtagtypeComponent, canActivate: [AuthGuardService] },
  { path: 'admintagtypes', component: AdmintagtypesComponent, canActivate: [RolesGuardOwnerService] },

  { path: 'editparagraphtype/:id', component: EditparagraphtypeComponent, canActivate: [AuthGuardService] },
  { path: 'addparagraphtype', component: AddparagraphtypeComponent, canActivate: [AuthGuardService] },
  { path: 'adminparagraphtypes', component: AdminparagraphtypesComponent, canActivate: [RolesGuardOwnerService] },

  { path: 'editparatagtype/:id', component: EditparatagtypeComponent, canActivate: [AuthGuardService] },
  { path: 'addparatagtype', component: AddparatagtypeComponent, canActivate: [AuthGuardService] },
  { path: 'adminparatagtypes', component: AdminparatagtypesComponent, canActivate: [RolesGuardOwnerService] },

  { path: 'editparapagetype/:id', component: EditparapagetypeComponent, canActivate: [AuthGuardService] },
  { path: 'addparapagetype', component: AddparapagetypeComponent, canActivate: [AuthGuardService] },
  { path: 'adminparapagetypes', component: AdminparapagetypesComponent, canActivate: [RolesGuardOwnerService] },

  { path: 'reset/:token', component: ResetComponent },
  { path: 'confirm/:token', component: ConfirmComponent },
  { path: 'delete/:token', component: DeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
