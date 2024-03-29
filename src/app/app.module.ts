import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccueilComponent} from './components/templates/home/accueil.component';
import {HttpClientModule} from '@angular/common/http';
import {PagesComponent} from './components/templates/pages/pages.component';
import {RegisterComponent} from './components/templates/user/register/register.component';
import {LoginComponent} from './components/templates/user/login/login.component';
import {ForgetComponent} from './components/templates/user/forget/forget.component';
import {TermsComponent} from './components/templates/terms/terms.component';
import {PrivacyComponent} from './components/templates/privacy/privacy.component';
import {SettingsComponent} from './components/templates/user/settings/settings.component';
import {PageComponent} from './components/templates/page/page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditpageComponent} from './components/templates/edit/editpage/editpage.component';
import {AddpageComponent} from './components/templates/add/addpage/addpage.component';
import {AddtagComponent} from './components/templates/add/addtag/addtag.component';
import {EdittagComponent} from './components/templates/edit/edittag/edittag.component';
import {AddcategoryComponent} from './components/templates/add/addcategory/addcategory.component';
import {EditcategoryComponent} from './components/templates/edit/editcategory/editcategory.component';
import {ValidatingComponent} from './components/templates/validating/validating.component';
import {DashboardComponent} from './components/templates/dashboard/dashboard.component';
import {FooterComponent} from './components/layouts/footer/footer.component';
import {HeaderComponent} from './components/layouts/header/header.component';
import {AdmindashboardComponent} from './components/templates/admin/admindashboard/admindashboard.component';
import {ContactComponent} from './components/templates/contact/contact.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdmincategoriesComponent} from './components/templates/admin/admincategories/admincategories.component';
import {AddparagraphtypeComponent} from './components/templates/add/addparagraphtype/addparagraphtype.component';
import {EditparagraphtypeComponent} from './components/templates/edit/editparagraphtype/editparagraphtype.component';
import {EditparapagetypeComponent} from './components/templates/edit/editparapagetype/editparapagetype.component';
import {AddparapagetypeComponent} from './components/templates/add/addparapagetype/addparapagetype.component';
import {AddparatagtypeComponent} from './components/templates/add/addparatagtype/addparatagtype.component';
import {EditparatagtypeComponent} from './components/templates/edit/editparatagtype/editparatagtype.component';
import {EdittagtypeComponent} from './components/templates/edit/edittagtype/edittagtype.component';
import {AddtagtypeComponent} from './components/templates/add/addtagtype/addtagtype.component';
import {AdmintagtypesComponent} from './components/templates/admin/admintagtypes/admintagtypes.component';
import {AdminparagraphtypesComponent} from './components/templates/admin/adminparagraphtypes/adminparagraphtypes.component';
import {AdminparatagtypesComponent} from './components/templates/admin/adminparatagtypes/adminparatagtypes.component';
import {AdminparapagetypesComponent} from './components/templates/admin/adminparapagetypes/adminparapagetypes.component';
import {ResetComponent} from './components/actions/reset/reset.component';
import {ConfirmComponent} from './components/actions/confirm/confirm.component';
import {DeleteComponent} from './components/actions/delete/delete.component';
import {AuthGuardService} from './service/guards/auth-guard.service';
import {AddimageComponent} from './components/templates/add/addimage/addimage.component';
import {EditimageComponent} from './components/templates/edit/editimage/editimage.component';
import {TicketComponent} from './components/templates/ticket/ticket.component';
import {AdminticketComponent} from './components/templates/admin/adminticket/adminticket.component';
import {DoubleAuthComponent} from './double-auth/double-auth.component';
import {CookieService} from 'ngx-cookie-service';
import {ConnectFromCookieComponent} from './components/templates/user/connect-from-cookie/connect-from-cookie.component';
import { AdminpagesComponent } from './components/templates/admin/adminpages/adminpages.component';
import { AdmintagsComponent } from './components/templates/admin/admintags/admintags.component';
import { AdminimagesComponent } from './components/templates/admin/adminimages/adminimages.component';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatSortModule} from '@angular/material/sort';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import {MatLegacyOptionModule as MatOptionModule} from '@angular/material/legacy-core';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { SearchComponent } from './components/templates/search/search.component';
import { FavoriteComponent } from './components/templates/favorite/favorite.component';

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
    AddcategoryComponent,
    EditcategoryComponent,
    ValidatingComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    AdmindashboardComponent,
    ContactComponent,
    AdmincategoriesComponent,
    AddparagraphtypeComponent,
    EditparagraphtypeComponent,
    EditparapagetypeComponent,
    AddparapagetypeComponent,
    AddparatagtypeComponent,
    EditparatagtypeComponent,
    EdittagtypeComponent,
    AddtagtypeComponent,
    AdmintagtypesComponent,
    AdminparagraphtypesComponent,
    AdminparatagtypesComponent,
    AdminparapagetypesComponent,
    ResetComponent,
    ConfirmComponent,
    DeleteComponent,
    AddimageComponent,
    EditimageComponent,
    TicketComponent,
    AdminticketComponent,
    DoubleAuthComponent,
    ConnectFromCookieComponent,
    AdminpagesComponent,
    AdmintagsComponent,
    AdminimagesComponent,
    SearchComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatChipsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    AuthGuardService,
    CookieService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
