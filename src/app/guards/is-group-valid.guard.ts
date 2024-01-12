import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsGroupValidGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const id = Number(route.paramMap.get('id'))
    if (isNaN(id) || id < 1) {
      alert('Invalid birthday id')
      this.router.navigate(['/birthdays/list'])
      return false;
    }
    return true;
  };
}