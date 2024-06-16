import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GuardianGuard implements CanActivate{

  constructor(private router:Router, private cookieService : CookieService){ }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token= this.cookieService.get('jwt');
    if (token){
      return true;
      }
    else
      {
      this.router.navigate(['/Login']);
      return false;
      }
  }
};
