import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
	filepathabout:string=Constant.API_ENDPOINT+"site/";  

	constructor(private api: ApiService) {}

	ngOnInit() {
		this.getPageData();
	}

	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}

	pageData:any={};
    getPageData(){
      this.api.GetPageDataFacts('order').subscribe(res => {     
        // console.log(res.response);        
       this.pageData= res.response;
         if(this.pageData.pge_banner != 'noimage.jpg' || this.pageData.pge_banner == ''){
            this.pageBan=this.pageData.pge_banner;           
         }else{
            this.getDeafultpgeBan();
         }
      });
    }

}
