import { Injectable } from '@angular/core';
// import { LiveAnnouncer } from '@angular/cdk/a11y';
// import { AfterViewInit, Component, OnInit, inject, Input, VERSION, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {}


  openSnackBar(message: string, action: string) {
	    this._snackBar.open(message, action, {
		  duration: 3000,
		  panelClass: ['mycsssnackbartest'],
		  	horizontalPosition: "center",
      		verticalPosition: "top",

		 });
	  }

	  openSuccessBar(message: string, action: string) {
	    this._snackBar.open(message, action, {
		  duration: 2000,
		  panelClass: ['successsnackbar'],
		  	horizontalPosition: "center",
      		verticalPosition: "top",
      		
		 });
	  }

	  openFailedBar(message: string, action: string) {
	    this._snackBar.open(message, action, {
		  duration: 2000,
		  panelClass: ['failedsnackbar'],
		  	horizontalPosition: "center",
      		verticalPosition: "top",
      		
		 });
	  }

	  openInfoBar(message: string, action: string) {
	    this._snackBar.open(message, action, {
		  duration: 2000,
		  panelClass: ['infosnackbar'],
		  	horizontalPosition: "center",
      		verticalPosition: "top",
      		
		 });
	  }

	  openWarnBar(message: string, action: string) {
	    this._snackBar.open(message, action, {
		  duration: 2000,
		  panelClass: ['warnsnackbar'],
		  	horizontalPosition: "center",
      		verticalPosition: "top",
      		
		 });
	  }



}
