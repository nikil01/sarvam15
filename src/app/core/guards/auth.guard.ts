import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/global.service';

let isauth = false;

@Injectable({
  providedIn: 'root',

})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, public loginHead: GlobalService){} 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.checkAuth().subscribe(
      (res) => {      
        isauth = res.success;   
        if(isauth){
          // console.warn('true res',res.success);
          // this.router.navigate(['/']);

        }
      },(err)=>{
        // console.warn('Error ',err.error);
        this.authService.logout();
        sessionStorage.clear();
        this.loginHead.showbutton=false;
        this.router.navigate(['/signin']);      
      })
    return isauth;
  }
  
}
