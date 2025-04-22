import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderprddetailComponent } from '../../shared/partials/sliderprddetail/sliderprddetail.component';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgbRatingConfig, NgbRatingModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { SeoService } from '../../core/services/seo.service';

import {Title, Meta} from '@angular/platform-browser';

import AOS from 'aos';
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p><button class="anibutton btn1" (click)="gotosignin()" (click)="activeModal.dismiss('Cross click')">Login</button> To Send Enquiry.</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})
export class NgbdModalContent {	
	constructor(public activeModal: NgbActiveModal, private router: Router) {}

	gotosignin(){
		// console.log(this.router.url);
		sessionStorage.setItem('backlink', this.router.url);
		this.router.navigate(['/signin']);

	}
}


@Component({
  selector: 'app-elitedetails',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbNavModule, SliderprddetailComponent, FormsModule, ReactiveFormsModule, NgxImageZoomModule, NgbRatingModule],
  templateUrl: './elitedetails.component.html',
  styleUrls: ['./elitedetails.component.css'],
  providers: [NgbRatingConfig, NgbModalConfig, NgbModal],
})
export class ElitedetailsComponent {
	url:any;
	elitedata:any={};  
	prdimages:any;
	prddetails:any;
	prdfeatures:any;
	imgone:any;

  	filepathmedium:string=Constant.API_ENDPOINT+"elite/medium/";
  	filepathoriginal:string=Constant.API_ENDPOINT+"elite/original/";
  	filepaththumbnail:string=Constant.API_ENDPOINT+"elite/thumbnail/";	

  	filepathabout:string=Constant.API_ENDPOINT+"site/";  

  constructor(private buildr: FormBuilder, private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router, modalconfig: NgbModalConfig, private modalService: NgbModal, private seo: SeoService, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) {
		modalconfig.backdrop = 'static';
		modalconfig.keyboard = false;
	}


	imgbank:any;
	imgbankfull:any;
	thumbimg:any;

	subtn:boolean = true;
	btnerr:string = '';



	FetchSEOdata(url:any){
		this.api.fetchSeoData(url).subscribe((res) => {
			// console.log(res.response);
			if(res.success){
				this.getEliteProductData(res.response.seo_pgeid);
				this.titleService.setTitle(res.response.seo_title);
				this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
				this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

				this.metaService.updateTag({ name: 'og:url', content: "https://www.sarvamsafety.com/elite-products"});
	            this.metaService.updateTag({ name: 'og:type', content: "Elite Products"});        
	            this.metaService.updateTag({ name: 'og:title', content: res.response.seo_title});
        this.metaService.updateTag({ name: 'og:description', content: res.response.seo_description });
        this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/elite-products");
	            
			}else{
				this.router.navigate(['page-not-found']);
			}			
		});
	}

	getEliteProductData(prdid:any){
		this.api.getelitedetail(prdid).subscribe((res) => {
			// console.log(res.response);
			this.elitedata=res.response.data;
			this.prdimages=res.response.images;
			this.prddetails=res.response.detail;			
			this.prdfeatures=res.response.features;
			this.imgbank=this.filepathmedium+res.response.imgone.img_image;
			this.imgbankfull=this.filepathoriginal+res.response.imgone.img_image;
			this.thumbimg=this.filepaththumbnail+res.response.imgone.img_image;

			this.metaService.updateTag({ name: 'og:image', content: Constant.API_ENDPOINT+"elite/medium/"+res.response.imgone.img_image});
		});
	}

	showthisimg(imgsrc){		
		this.imgbank = this.filepathmedium+imgsrc;
		this.imgbankfull=this.filepathoriginal+imgsrc;	
		this.thumbimg=this.filepaththumbnail+imgsrc;
	}

	sendenquiry(prdid) {
		if(sessionStorage.getItem('token')){			
			this.modalService.open(prdid, { size: 'lg', centered: true });
		}else{			
			
			this.modalService.open(NgbdModalContent);
		}
					
	}

	quotation: FormGroup = new FormGroup({
		quantity: this.buildr.control('10'),
		pin: this.buildr.control(''),
		remarks: this.buildr.control('')
	});
	submitted = false;

	ngOnInit(): void {
		this.seo.FetchSEOdata();
		this.getPageData();
		AOS.init({ once: true, disable: 'mobile'});
	    AOS.refresh();
	   
	    this.url = this.activatedRoute.snapshot.params['prdid'];
	    this.FetchSEOdata(this.url);

		this.quotation = this.buildr.group(
			{
				quantity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4), Validators.min(1), Validators.max(9999)]],
				pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.min(100001), Validators.max(999999)]],
				remarks: ['', [Validators.required]]
			}
		);
	}

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('elite-product').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	get f(): { [key: string]: AbstractControl } {
		return this.quotation.controls;
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.quotation.invalid) {
			return;
		}

		// console.log(JSON.stringify(this.regfrm.value, null, 2));
		this.requestquotation();

	}

	onReset(): void {
		this.submitted = false;
		this.quotation.reset();
	}
	formVisi:boolean=true;
	requestquotation(){
		this.api.requestquotation(this.quotation.value, this.elitedata.ctl_id).subscribe(res => {
			// console.log(res);
			if(res.success){				
				// console.log('registered');
				this.formVisi=false;
				this.btnerr="We have Recived Enquiry for"+this.elitedata.ctl_name+" - We'll Revert Soon. Thank-You."
			}else{
				// console.log('dublicate');
				this.btnerr="Sending Request Failed! Please Try Again";
				this.formVisi=true;
			}

		});
	}

	gotosignin(){
		// console.log(this.router.url);
		sessionStorage.setItem('backlink', this.router.url);
		this.router.navigate(['/signin']);
	}


	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}

}

	
