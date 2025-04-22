import { Injectable, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Constant } from '../../shared/constant';
import { ApiService } from '../../shared/api.service';


@Injectable({
  providedIn: 'root'
})
export class SeoService {
	url:any;
  	constructor(private metaService: Meta, private router: Router, private api: ApiService, private activatedRoute: ActivatedRoute, private titleService: Title) {
  		
  	}

	FetchSEOdata(){

		// this.metaService.addTag( { name:'description',content:"Article Description"});
		const totalurl = this.router.url;
const myArray = totalurl.split("/");
console.log(myArray[2]);
		
		this.api.fetchSeoData(myArray[2]).subscribe((res) => {
			
			if(res.success){
				this.metaService.addTags([ 
				    { name: 'description', content: res.response.seo_description }, 
				    { name: 'keywords', content: res.response.seo_keywords }
				]);
				this.titleService.setTitle(Constant.BASE_URL+' - '+ res.response.seo_title);
			}else{
				this.router.navigate(['page-not-found']);
			}			
		});
	}

	// ngOnInit() {
	//     this.metaService.addTag( { name:'description',content:"Article Description"});
	//     this.titleService.setTitle( "Santy" );
	//   }

	// addTag() {
	//    this.metaService.addTag({ name: 'description', content: 'Article Description' });
	//    this.metaService.addTag({ name: 'robots', content: 'index,follow' });
	//    this.metaService.addTag({ property: 'og:title', content: 'Content Title for social media' });
	// }


	
}
