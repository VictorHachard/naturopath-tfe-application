import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl} from '@angular/forms';
import {UserSecurityService} from '../../service/security/UserSecurity.service';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {Injector} from '@angular/core';
import {environment} from '../../../environments/environment';

export class AbstractComponents {

  apiResourceUrl = environment.apiResourceUrl;

  constructor() { }

  printError(formControl: AbstractControl): string {
    if (this.hasToPrintError(formControl)) {
      let errors = '';
      if (formControl.errors.required) {
        errors += 'Please type a something.';
      }
      if (formControl.errors.minlength) {
        errors += 'Please insert a minimum of ' + formControl.errors.minlength.requiredLength + ' characters.';
      }
      if (formControl.errors.maxlength) {
        errors += 'Please insert a maximum of ' + formControl.errors.maxlength.requiredLength + ' characters.';
      }
      if (formControl.errors.email) {
        errors += 'Please insert a valid email address.';
      }
      //password only
      if (formControl.errors.pattern) {
        errors += 'Password must contain at least one lowercase, uppercase, numeric, special character and between six and sixteen characters.';
      }
      if (formControl.errors?.noMatch) {
        errors += 'The password does not match.';
      }
      return errors;
    } else {
      return '';
    }
  }

  private hasToPrintError(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
