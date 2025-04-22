import { Component, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';

import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser'; 
import { UpdateSeoTagsService } from '../../shared/update-seo-tags.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-blogread',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blogread.component.html',
  styleUrls: ['./blogread.component.css']
})
export class BlogreadComponent implements OnInit{

	filepathblog:string=Constant.API_ENDPOINT+"blog/";
	filepathabout:string=Constant.API_ENDPOINT+"site/";  
    blogData:any;
    OneBlog:any;
    LastBlog:any;
    NextBlog:any;
    BlogContent:any;
    id:any;
    

  constructor(private api: ApiService, private Activatedroute: ActivatedRoute, private router: Router, private metaService: Meta, private titleService: Title, private updateSeoTagsService: UpdateSeoTagsService) { }


    ngOnInit() {
	  this.getblogdata();
	  this.getPageData();

	    this.Activatedroute.queryParamMap.subscribe((queryParams) => {
			this.id = this.Activatedroute.snapshot.queryParamMap.get('id') || '';		
			if(this.id == ''){this.router.navigate(['/blog'])}else{		
				
				this.getblogdataOne(this.id);	

			}
					
		});

	    
	  }

	  FetchSEOdata(url:any){
		this.api.fetchSeoData(url).subscribe((res) => {
			// console.log(res.response);
			// if(res.success){				
				this.titleService.setTitle(res.response.seo_title);
				this.metaService.updateTag({ name: 'keywords', content: res.response.seo_keywords});
				this.metaService.updateTag({ name: 'description', content: res.response.seo_description});

      this.metaService.updateTag({ property: 'og:url', content: "https://www.sarvamsafety.com/blogs?id=" + this.id + "&title=" + res.response.seo_title });
      this.updateSeoTagsService.setCanonical("https://www.sarvamsafety.com/blogs?id=" + this.id + "&title=" + res.response.seo_title);
	            this.metaService.updateTag({ property: 'og:type', content: "blog"});        
	            this.metaService.updateTag({ property: 'og:title', content: res.response.seo_title});
	            this.metaService.updateTag({ property: 'og:description', content: res.response.seo_description});


	            
			// }else{
				// this.router.navigate(['page-not-found']);
			// }			
		});		
	}

	  getblogdata(){
	    this.api.getAllBlog().subscribe(res => {     
	      // console.log(res.response);        
	     this.blogData= res.response.data;

	    });
	  }

	  pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('blogs').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

	  getblogdataOne(id:any){
	    this.api.getOneBlog(id).subscribe(res => {     
	      // console.log(res.response);        
	      this.FetchSEOdata(this.id);

	     this.OneBlog= res.response.data;
	     this.LastBlog=res.response.data.lastone;
	     this.NextBlog=res.response.data.nextone;
	     
	     this.metaService.updateTag({ property: 'og:image', content: Constant.API_ENDPOINT+"blog/"+res.response.data.blg_photo});

	    });
	  }

	  searchtag="";
	    searchFor(){
	      this.router.navigate(['/blog'], { queryParams: { saechkey: [this.searchtag]}});
	    }

	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		// console.log(res.response);        
		this.pageBan= res.response;

		});
	}

}
