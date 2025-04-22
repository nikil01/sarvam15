import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }  
  showbutton: boolean = false;
  usrname:string = '';

  CartCount:number = 0;
  wishCount:number = 0;

  


}
