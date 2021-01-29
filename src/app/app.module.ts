import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccueilComponent} from './components/templates/home/accueil.component';
import {HttpClientModule} from '@angular/common/http';
import {PagesComponent} from './components/templates/pages/pages.component';
import {RegisterComponent} from './components/templates/register/register.component';
import {LoginComponent} from './components/templates/login/login.component';
import {ForgetComponent} from './components/templates/forget/forget.component';
import {TermsComponent} from './components/templates/terms/terms.component';
import {PrivacyComponent} from './components/templates/privacy/privacy.component';
import {SettingsComponent} from './components/templates/settings/settings.component';
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
import { AdmincategoriesComponent } from './components/templates/admin/admincategories/admincategories.component';
import { AddparagraphtypeComponent } from './components/templates/add/addparagraphtype/addparagraphtype.component';
import { EditparagraphtypeComponent } from './components/templates/edit/editparagraphtype/editparagraphtype.component';
import { EditparapagetypeComponent } from './components/templates/edit/editparapagetype/editparapagetype.component';
import { AddparapagetypeComponent } from './components/templates/add/addparapagetype/addparapagetype.component';
import { AddparatagtypeComponent } from './components/templates/add/addparatagtype/addparatagtype.component';
import { EditparatagtypeComponent } from './components/templates/edit/editparatagtype/editparatagtype.component';
import { EdittagtypeComponent } from './components/templates/edit/edittagtype/edittagtype.component';
import { AddtagtypeComponent } from './components/templates/add/addtagtype/addtagtype.component';
import { AdmintagtypesComponent } from './components/templates/admin/admintagtypes/admintagtypes.component';
import { AdminparagraphtypesComponent } from './components/templates/admin/adminparagraphtypes/adminparagraphtypes.component';
import { AdminparatagtypesComponent } from './components/templates/admin/adminparatagtypes/adminparatagtypes.component';
import { AdminparapagetypesComponent } from './components/templates/admin/adminparapagetypes/adminparapagetypes.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    BrowserAnimationsModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
