import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalConfig, NgbModal, NgbOffcanvasConfig, NgbOffcanvas, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';


import { NgbTypeaheadConfig, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';

import { ApiService } from '../../../shared/api.service';

import { AuthService } from '../../../core/services/auth.service';

import { GlobalService } from '../../../shared/global.service';

import {Title, Meta} from '@angular/platform-browser';


export class searchMain {searchKey : string = '';}

const productsname = [];


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, RouterModule, NgbDropdownModule, NgbTypeaheadModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbOffcanvasConfig, NgbOffcanvas, NgbTypeaheadConfig],
  encapsulation: ViewEncapsulation.None, 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})



export class HeaderComponent implements OnInit {
	usract:boolean =false;
	isMenuCollapsed = true;
	public keyword: any;
	// search:any;
	searchObj:searchMain = new searchMain();
	products:any;
	screensize:any;
	// usrname:string ='';
	HeaderLinks:any;
	CartWishCount:any;
	cartcount:number =0;
	wishcount:number =0;
	

	

	searching = false;
	searchFailed = false;

	seoset:any;
	url:any;

	ngOnInit():void{	
		
		// this.titleService.setTitle("Sarvam Safety Private Limited");
		// this.metaService.updateTag({ name: 'keywords', content: 'Sarvam Safety Private Limited'});
		// this.metaService.updateTag({ name: 'description', content: 'Sarvam Safety Private Limited'});

		// this.url = this.router.url;
		// console.log(this.url);
		// this.FetchSEOdata(this.url);
		// this.screensize = window.screen.width;
		this.checkLogin();
		// this.cartcount = 0;	
		// this.wishcount = 0;
		
		const dateid = (Date.now()).toString();
		if(!localStorage.getItem("visitorid")){
			localStorage.setItem("visitorid", dateid);
		}
		this.loginHead.showbutton=false;

		if(sessionStorage.getItem('token')){
			this.loginHead.usrname=sessionStorage.getItem('name');
			this.loginHead.showbutton=true;
		}

		this.GetHeaderLinks();
		this.GetWishCartCount();

		this.cartcount = this.loginHead.CartCount;
		this.wishcount = this.loginHead.wishCount;

		this.logVisitor();

	}

	FetchSEOdata(url:any){
		this.api.fetchSeoData(url).subscribe((res) => {
			// console.log(res.response);
			if(res.success){				
				this.titleService.setTitle("Sarvam Safety - "+res.response.seo_title);
				this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
				this.metaService.updateTag({ name: 'description', content: res.response.seo_description});
			}else{
				// this.router.navigate(['page-not-found']);
			}			
		});		
	}
	
	logout(){
		this.authService.logout();
		sessionStorage.clear();
		this.loginHead.showbutton=false;
		this.router.navigate(['/signin']); 
	}


	constructor(public loginHead: GlobalService, config: NgbModalConfig, private modalService: NgbModal, MenuConfig: NgbOffcanvasConfig, private offcanvasService: NgbOffcanvas, private api:ApiService, searchconfig: NgbTypeaheadConfig, private router: Router, private authService: AuthService, private metaService: Meta, private titleService: Title) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
		MenuConfig.position = 'end';
		MenuConfig.backdropClass = 'bg-dark';
		MenuConfig.keyboard = true;
		MenuConfig.panelClass='details-panel';
		searchconfig.showHint = false;
		searchconfig.focusFirst  = false;	
		
		// console.log(this.router.url);
	}

	open(content) {
		this.modalService.open(content);
		
	}


	sidemenu(content) {
		this.offcanvasService.open(content);
	}

	logVisitor(){
	    this.api.logvisitor().subscribe(res => {     
	      // console.log(res.response);
	    });
	  }
	// ================================================== main search
	// searchMain(){
	// 	// console.log(this.keyword);
	// 	this.searchObj.searchKey = this.keyword;
	// 	this.api.listproductsearch(this.searchObj).subscribe((res) => {
			
	// 		// console.log(res);
	// 		this.products = res.data;
			
	// 	},err=>{
	// 		console.log(err);
	// 		// this.toastr.warning('updating record failed!');
	// 		// this.router.navigate(['/login']);
	// 	})
	// }


	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>	
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			tap(() => (this.searching = true)),
			switchMap((term) =>
				this.api.listproductsearch(term).pipe(

					tap(() => (this.searchFailed  = false)),
					catchError(() => {
						this.searchFailed  = true;
						return of([]);
					}),
				),
			),
			tap(() => (this.searching = false)),
		);
	

	checkLogin(){
		if(sessionStorage.getItem("token")){
			this.api.loginCheck().subscribe(res => {   
				// let isauth = res.success;  
				if(res.success){
		          // console.warn('true res',res.success);
		          // this.router.navigate(['/']);	          
		          this.loginHead.showbutton=true;
		          this.loginHead.usrname=sessionStorage.getItem('name');
		        }else{
		        	this.authService.logout();
			        sessionStorage.clear();
			        this.loginHead.showbutton=false;
			        // this.router.navigate(['/signin']);   
		        }
		    });	

		}else{
			return false;
		}
		
		
	}


	// ==========================================================================
	gotosignin(){
		// console.log(this.router.url);
		sessionStorage.setItem('backlink', this.router.url);
		this.router.navigate(['/signin']);
	}

	gotosignup(){
		// console.log(this.router.url);
		sessionStorage.setItem('backlink', this.router.url);
		this.router.navigate(['/signup']);
	}

	saerchit(){	
		// const myArray = this.keyword.split("-");
		// let word = myArray[1];
		// if(word != 'elite'){
		// 	this.router.navigate(['/shopnow'], { queryParams: { searchKey: [this.keyword]}});
		// }else{
		// 	this.router.navigate(['/elite-products'], { queryParams: { searchKey: [this.keyword]}});
		// }

		this.router.navigate(['/search'], { queryParams: { searchKey: [this.keyword]}}).then(() => {window.location.reload();});

		// this.router.navigate(['path/to']).then(() => {window.location.reload();});
		
		this.keyword ='';
	}

	 GetHeaderLinks(){
	    this.api.GetHeaderLinks().subscribe(res => {     
	      // console.log(res.response);        
	     this.HeaderLinks= res.response.data;

	    });
	  }

	  GetWishCartCount(){
	    this.api.fetchCartCount().subscribe(res => {     
	      // console.log(res.response);        
	     this.loginHead.CartCount= res.response.cartcount;
	     this.loginHead.wishCount= res.response.wishcount;

	    });
	  }




}
