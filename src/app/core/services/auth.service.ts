import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Router } from '@angular/router';

import { Constant } from '../../shared/constant';
import { GlobalService } from '../../shared/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public loginHead: GlobalService, private http: HttpClient, private router: Router) { }

  checkAuth():Observable<any>{
  	return this.http.get(Constant.API_ENDPOINT+'website/open/read/loginCheck');
  }

  logout() {
    sessionStorage.removeItem('token');
    this.loginHead.showbutton=true;
  }
}
