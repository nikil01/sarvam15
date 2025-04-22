import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Constant } from '../../shared/constant';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {
	filepathabout:string=Constant.API_ENDPOINT+"site/";  

	constructor(private api: ApiService) {}

	ngOnInit() {
		this.getDeafultpgeBan();
	}

	pageBan:any;
	getDeafultpgeBan(){
		this.api.fetchPageDeafultBan().subscribe(res => {     
		  // console.log(res.response);        
		 this.pageBan= res.response;

		});
	}
}
