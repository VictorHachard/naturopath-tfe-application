import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesGuardOwnerService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return localStorage.getItem('currentUser') !== null &&
      JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_OWNER');
  }

}

@Injectable({
  providedIn: 'root'
})
export class RolesGuardAdminService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return localStorage.getItem('currentUser') !== null &&
      JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_ADMINISTRATOR');
  }

}

@Injectable({
  providedIn: 'root'
})
export class RolesGuardModeratorService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return localStorage.getItem('currentUser') !== null &&
      JSON.parse(localStorage.getItem('currentUser')).roleList.includes('ROLE_MODERATOR');
  }

}
