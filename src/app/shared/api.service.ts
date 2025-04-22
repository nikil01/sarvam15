import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { Constant } from './constant';

const PARAMS = new HttpParams({fromObject: {},});


@Injectable({
  providedIn: 'root'
})



export class ApiService {

  constructor(private http:HttpClient) { }  	

  	registeruser(data:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));
		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('mobile', data.mobile);
		formData.append('pass', data.pass);		
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/signup', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	registerotp(data:any, count:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));		
		formData.append('mobile', sessionStorage.getItem("mobile"));
		formData.append('cstid', sessionStorage.getItem("cstid"));	
		formData.append('otp', data.otp);	
		formData.append('count', count);		
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/signupotp', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	signinpassword(data:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));	
		formData.append('uid', data.uid);			
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/signinpass', formData).pipe(map((res:any) => {
			return res;
		}))
	}


	pwdsignin(data:any, count:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));		
		formData.append('uid', sessionStorage.getItem("mobile"));
		formData.append('cstid', sessionStorage.getItem("cstid"));	
		formData.append('pwd', data.pwd);	
		formData.append('count', count);		
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/pwdsignin', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	signinotp(data:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));	
		formData.append('uid', data.uid);			
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/signinotp', formData).pipe(map((res:any) => {
			return res;
		}))
	}


	otpsignin(data:any, count:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));		
		formData.append('uid', sessionStorage.getItem("mobile"));
		formData.append('cstid', sessionStorage.getItem("cstid"));	
		formData.append('otp', data.otp);	
		formData.append('count', count);		
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/otpsignin', formData).pipe(map((res:any) => {
			return res;
		}))
	}


	listproductsearch(data: string){		
		return this.http.get<[any, string[]]>(Constant.API_ENDPOINT+'website/open/read/mainsearch/'+data).pipe(map((res:any) => {
			// console.log(res.response);
			return res.response;
		}))
	}

	loginCheck(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/loginCheck').pipe(map((res:any) => {
			return res;
		}))
	}



	getteamdata(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/teamdata').pipe(map((res:any) => {
			return res;
		}))
	}

	getsupplierdata(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/supplierdata').pipe(map((res:any) => {
			return res;
		}))
	}

	getClientDta(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getclientdata').pipe(map((res:any) => {
			return res;
		}))
	}

	getThreeBlog(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getthreeblog').pipe(map((res:any) => {
			return res;
		}))
	}

	getAllBlog(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getallblog').pipe(map((res:any) => {
			return res;
		}))
	}

	getBlogList(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getbloglist', data).pipe(map((res:any) => {
			return res;
		}))
	}

	getOneBlog(bid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getoneblog/'+bid).pipe(map((res:any) => {
			return res;
		}))
	}

	getMainSlider(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getmainlsider').pipe(map((res:any) => {
			return res;
		}))
	}

	logvisitor(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/logvisitor/'+localStorage.getItem("visitorid")).pipe(map((res:any) => {
			return res;
		}))
	}

	getelitedata(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getelitedata', data).pipe(map((res:any) => {
			return res;
		}))
	}

	getshoppingdata(data:any){
		// console.log(data);
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getshoppingdata', data).pipe(map((res:any) => {
			return res;
		}))
	}

	getelitedetail(prdid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getelitedetail/'+prdid).pipe(map((res:any) => {
			return res;
		}))
	}

	getProductdetail(prdid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getshopdetail/'+prdid+'/'+localStorage.getItem("visitorid")).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchSeoData(url:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getseodata/'+url).pipe(map((res:any) => {
			return res;
		}))
	}

	requestquotation(data:any, prdid:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));	
		formData.append('cstid', sessionStorage.getItem("cstid"));		
		formData.append('prdid', prdid);		
		formData.append('quantity', data.quantity);	
		formData.append('pinzip', data.pin);
		formData.append('remarks', data.remarks);		
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/requestquotation', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	// ===================================================================================
	fetchAllCategoreis(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getcategories').pipe(map((res:any) => {
			return res;
		}))
	}

	fetchAllFilters(catid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getfilter/'+catid).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchPriceRange(catid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getpricerange/'+catid).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchBrands(catid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getbrands/'+catid).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchColors(catid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getcolorfltr/'+catid).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchSizes(catid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getsizefltr/'+catid).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchGrams(catid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getgramsfltr/'+catid).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchSideBanner(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getsidebanner').pipe(map((res:any) => {
			return res;
		}))
	}

	fetchCatData(catid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getcatdata/'+catid).pipe(map((res:any) => {
			return res;
		}))
	}

	// =========================================================================================

	addToCart(prdid:any, quantity:any){
  		// console.log(data);
  		let cstid = localStorage.getItem("visitorid");
		if(sessionStorage.getItem("cstid")){
			cstid=sessionStorage.getItem("cstid");
		}
		const formData = new FormData();
		formData.append('cstid', cstid);		
		formData.append('prdid', prdid);		
		formData.append('quantity', quantity);				
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/addtocart', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	addToWish(prdid:any){
  		// console.log(data);
  		let cstid = localStorage.getItem("visitorid");
		if(sessionStorage.getItem("cstid")){
			cstid=sessionStorage.getItem("cstid");
		}
		const formData = new FormData();
		formData.append('cstid', cstid);		
		formData.append('prdid', prdid);
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/addtowish', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchCartCount(){		
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getcartcount/'+localStorage.getItem("visitorid")+'/'+sessionStorage.getItem("cstid")).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchCartList(){		
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getcartlist/'+localStorage.getItem("visitorid")+'/'+sessionStorage.getItem("cstid")).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchWishList(){		
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getwishlist/'+localStorage.getItem("visitorid")+'/'+sessionStorage.getItem("cstid")).pipe(map((res:any) => {
			return res;
		}))
	}

	removeFromWishList(wshid:any){		
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/delfromwish/'+wshid).pipe(map((res:any) => {
			return res;
		}))
	}

	DeleteFromCart(prdid:any){		
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/delfromcart/'+prdid).pipe(map((res:any) => {
			return res;
		}))
	}

	moveToCart(prdid:any, wshid:any){	
		let cstid = localStorage.getItem("visitorid");
		if(sessionStorage.getItem("cstid")){
			cstid=sessionStorage.getItem("cstid");
		}	
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/movetocart/'+prdid+'/'+wshid+'/'+cstid).pipe(map((res:any) => {
			return res;
		}))
	}

	updateCart(prdid:any, crtid:any, updt:number){		
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/updatecart/'+prdid+'/'+crtid+'/'+updt).pipe(map((res:any) => {
			return res;
		}))
	}
	// =========================================================================================

	fetchRecentItems(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getrecentitems/'+localStorage.getItem("visitorid")).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchRelatedItems(catid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getrelateditems/'+catid).pipe(map((res:any) => {
			return res;
		}))
	}

	// ========================================================================================

	fetchVarientsItems(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getvarientitems/'+sessionStorage.getItem("prdid")).pipe(map((res:any) => {
			return res;
		}))
	}

	// =========================================================================================

	fetchAllProducts(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getallproducts', data).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchFeaturedProducts(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getfeaturedproducts', data).pipe(map((res:any) => {
			return res;
		}))
	}

	// ======================================================================== all common data==================

	getTestimonydata(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchtentestimony').pipe(map((res:any) => {
			return res;
		}))
	}

	getTestimonyTraining(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchtrainingtesty').pipe(map((res:any) => {
			return res;
		}))
	}

	getEquipmentData(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchequipmets').pipe(map((res:any) => {
			return res;
		}))
	}

	// dta_gstin, dta_taxtype, dta_cinno, dta_bank, dta_logo, dta_accountnum, dta_branch, dta_branchcode, dta_micronum, dta_ifsc, dta_swift, dta_timings, dta_linkedin, dta_facebook, dta_instagram, dta_youtube, dta_video, dta_sarvamites, dta_customers, dta_suppliers, dta_products
	getSiteData(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchsitedata').pipe(map((res:any) => {
			return res;
		}))
	}

	// off_city, off_state, off_address, off_pin, off_phone, off_mobile, off_email
	getOfficeDataOne(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchoneoffice').pipe(map((res:any) => {
			return res;
		}))
	}

	getOfficeDataBranch(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchbranchoffice').pipe(map((res:any) => {
			return res;
		}))
	}

	GetFooterLinks(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcfooterlink').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeaderLinks(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheaderlink').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeadingTextsOne(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheadingone').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeadingTextsTwo(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheadingtwo').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeadingTextsThree(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheadingthree').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeadingTextsFour(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheadingfour').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeadingTextsFive(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheadingfive').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeadingTextsSix(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheadingsix').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeadingTextsSeven(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheadingseven').pipe(map((res:any) => {
			return res;
		}))
	}

	GetHeadingTextsEight(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetcheadingeight').pipe(map((res:any) => {
			return res;
		}))
	}

	// ====================================================================================
	GetAboutMainTexts(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchhomeaboutmain').pipe(map((res:any) => {
			return res;
		}))
	}

	GetAboutFirstTexts(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchhomeaboutfirst').pipe(map((res:any) => {
			return res;
		}))
	}

	GetAboutSecondTexts(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchhomeaboutsecond').pipe(map((res:any) => {
			return res;
		}))
	}

	// ====================================================================================
	GetAboutUsMainTexts(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchaboutusmain').pipe(map((res:any) => {
			return res;
		}))
	}

	GetAboutUsMission(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchaboutusmission').pipe(map((res:any) => {
			return res;
		}))
	}

	GetAboutUsVission(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchaboutusvission').pipe(map((res:any) => {
			return res;
		}))
	}

	GetTrainingFirstText(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchtrainingfirst').pipe(map((res:any) => {
			return res;
		}))
	}

	// ======================================================================================

	sendFeedback(data:any){
  		// console.log(data);
		const formData = new FormData();
		let cstid = localStorage.getItem("visitorid");
		if(sessionStorage.getItem("cstid")){
			cstid=sessionStorage.getItem("cstid");
		}

		formData.append('visitorid', cstid);	
		formData.append('name', data.name);	
		formData.append('company', data.company);		
		formData.append('email', data.email);	
		formData.append('mobile', data.mobile);		
		formData.append('subject', data.subject);	
		formData.append('message', data.message);				
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/sendfeedback', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	// ======================================================================================

	getEventList(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getallevents', data).pipe(map((res:any) => {
			return res;
		}))
	}

	getEventOne(id:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getoneevent/'+id).pipe(map((res:any) => {
			return res;
		}))
	}

	getEventOneSpl(id:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getoneeventspl/'+id).pipe(map((res:any) => {
			return res;
		}))
	}

	getThreeEvent(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getthreeevent').pipe(map((res:any) => {
			return res;
		}))
	}

	// ================================================================== event register and payment
	regparticipant(data:any, id:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('eventid', id);
		formData.append('fname', data.fname);
		formData.append('lname', data.lname);
		formData.append('email', data.email);
		formData.append('mobile', data.mobile);
		formData.append('job', data.job);	
		formData.append('company', data.company);	
		formData.append('howdid', data.howdid);	
		formData.append('expected', data.expected);				
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/regforevent', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	regEevntConfirm(data:any, count:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));		
		formData.append('mobile', sessionStorage.getItem("participantmobile"));
		formData.append('epid', sessionStorage.getItem("participantid"));	
		formData.append('otp', data.otp);	
		formData.append('company', data.company);	
		formData.append('count', count);		
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/eventregconfirm', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	makePayment(data:any){  		
		const formData = new FormData();
		formData.append('EncData', data.EncData);		
		formData.append('MerchantId', data.MerchantId);
		formData.append('BankId', data.BankId);	
		formData.append('TerminalId', data.TerminalId);
		formData.append('Version', data.Version);		
		// console.log(formData.get("MerchantId"));
		return this.http.post('https://payuatrbac.icicibank.com/payment-capture/?', data, { headers: { 'Anonymous': '' }}).pipe(map((res:any) => {
			return res;
		}))
	}


	// ====================================================================== rofile and password

	getMyProfile(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getmyprofile/'+sessionStorage.getItem("cstid")).pipe(map((res:any) => {
			return res;
		}))
	}

	updateProfile(data:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));		
		formData.append('cstid', sessionStorage.getItem("cstid"));
		formData.append('name', data.name);	
		formData.append('mobile', data.mobile);	
		formData.append('email', data.email);	
		formData.append('company', data.company);				
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/editmyprofile', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	genrateOtp(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getpwdotp/'+sessionStorage.getItem("cstid")).pipe(map((res:any) => {
			return res;
		}))
	}

	regenrateOtp(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/resetotp/'+sessionStorage.getItem("mobile")).pipe(map((res:any) => {
			return res;
		}))
	}

	changepwd(data:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));		
		formData.append('cstid', sessionStorage.getItem("cstid"));		
		formData.append('otp', data.otp);	
		formData.append('pass', data.pass);			
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/changepwd', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	resetpwd(data:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));		
		formData.append('cstid', sessionStorage.getItem("cstid"));		
		formData.append('otp', data.otp);	
		formData.append('pass', data.pass);			
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/resetpwd', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	// ===================================================================== other pages

	getTnCData(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/gettncdata').pipe(map((res:any) => {
			return res;
		}))
	}

	getBizPolicyData(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getbizpolicy').pipe(map((res:any) => {
			return res;
		}))
	}

	getPayMethodsData(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getpaymethods').pipe(map((res:any) => {
			return res;
		}))
	}

	getFAQData(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getfaqsdata').pipe(map((res:any) => {
			return res;
		}))
	}

	getJobData(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getjobdata', data).pipe(map((res:any) => {
			return res;
		}))
	}

	getJobDetail(jid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getjobdetail/'+jid).pipe(map((res:any) => {
			return res;
		}))
	}

	applyForJob(data:any, img:File, pdf:File){
		const newdate = data.dob.year+'-'+data.dob.month+'-'+data.dob.day;
		const formData = new FormData();		
		formData.append('jobid', data.jobid);	
		formData.append('name', data.name);	
		formData.append('email', data.email);	
		formData.append('mobile', data.mobile);	
		formData.append('education', data.education);	
		formData.append('skills', data.skills);	
		formData.append('experience', data.experience);	
		formData.append('pin', data.pin);	
		formData.append('linkedin', data.linkedin);	
		formData.append('dob', newdate);
		formData.append('photo', img);
		formData.append('resume', pdf);
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/applyforjob', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	getFlipBookData(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getflipbook', data).pipe(map((res:any) => {
			return res;
		}))
	}

	getTrainingTopics(id:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/gettrainingtopics/'+id).pipe(map((res:any) => {
			return res;
		}))
	}

	getTrainingHeading(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/gettraininggroups').pipe(map((res:any) => {
			return res;
		}))
	}

	applyForTraining(data:any){		
		const formData = new FormData();		
		formData.append('visitorid', localStorage.getItem("visitorid"));	
		formData.append('name', data.name);	
		formData.append('email', data.email);	
		formData.append('phone', data.mobile);	
		formData.append('location', data.location);	
		formData.append('company', data.company);	
		formData.append('topics', data.topics);	
		formData.append('remarks', data.remarks);		
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/applyfortraining', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	getAlbumData(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getalbumitems', data).pipe(map((res:any) => {
			return res;
		}))
	}

	getAlbumPhotos(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getalbumitems', data).pipe(map((res:any) => {
			return res;
		}))
	}

	getVarients(varid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getvarients/'+varid).pipe(map((res:any) => {
			return res;
		}))
	}

	getVarientsSize(varid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getvarientssize/'+varid).pipe(map((res:any) => {
			return res;
		}))
	}

	getVarientsColor(varid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getvarientscolor/'+varid).pipe(map((res:any) => {
			return res;
		}))
	}

	getPaymentStatus(epid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getpaymentstatus/'+epid).pipe(map((res:any) => {
			return res;
		}))
	}

	checkCouponCode(cpncode:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/chckcouponcode/'+cpncode+'/'+localStorage.getItem("visitorid")+'/'+sessionStorage.getItem("cstid")).pipe(map((res:any) => {
			return res;
		}))
	}

	prepareOrder(data:any){
		const formData = new FormData();
		formData.append('cstid', sessionStorage.getItem("cstid"));		
		formData.append('name', data.name);
		formData.append('mobile', data.mobile);	
		formData.append('email', data.email);	
		formData.append('company', data.company);	
		formData.append('gst', data.gst);
		formData.append('ba', data.ba);
		formData.append('da', data.da);
		formData.append('couponcode', data.couponcode);
		formData.append('coupontype', data.coupontype);

		return this.http.post(Constant.API_ENDPOINT+'website/open/read/prepareorder', formData).pipe(map((res:any) => {
			return res;
		}))
	}

	checkOrderStatus(orderid:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getoneorder/'+orderid).pipe(map((res:any) => {
			return res;
		}))
	}

	checkPinCode(pincode:any){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/checkpincode/'+pincode).pipe(map((res:any) => {
			return res;
		}))
	}

	fetchOptionData(selSize:string, selColor:string, varientId:string){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getVarUrl/'+selSize+'/'+selColor+'/'+varientId).pipe(map((res:any) => {
			return res;
		}))
	}

	getpopupbanner(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchpopupbanner').pipe(map((res:any) => {
			return res;
		}))
	}

	fetchPageDeafultBan(){
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/fetchdefaultpgeban').pipe(map((res:any) => {
			return res;
		}))
	}

	GetPageDataFacts(pageid:any){		
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/getpagedatafacts/'+pageid).pipe(map((res:any) => {
			return res;
		}))
	}

	getorderstatus(data:any){
		let trackid = data.trackingid;
		return this.http.get(Constant.API_ENDPOINT+'website/open/read/orderstatus/'+trackid).pipe(map((res:any) => {
			return res;
		}))
	}	

	// ======================================================================================

	getOrderHistory(data:any){
  		// console.log(data);
		const formData = new FormData();
		let cstid = localStorage.getItem("visitorid");
		if(sessionStorage.getItem("cstid")){
			cstid=sessionStorage.getItem("cstid");
		}
					
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/listmyorders/'+cstid, data).pipe(map((res:any) => {
			return res;
		}))
	}

	// ======================================================================================

	getsearchdata(data:any){
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/getsearchdata', data).pipe(map((res:any) => {
			return res;
		}))
	}


	// ================================================= send order success getMainSlider

	sendMailer(cstid:any, orderid:any){
  		// console.log(data);
		const formData = new FormData();
		formData.append('visitorid', localStorage.getItem("visitorid"));		
		formData.append('mobile', sessionStorage.getItem("mobile"));
		formData.append('cstid', sessionStorage.getItem("cstid"));	
		formData.append('cstmrid', cstid);	
		formData.append('orderid', orderid);		
		return this.http.post(Constant.API_ENDPOINT+'website/open/read/sendmailer', formData).pipe(map((res:any) => {
			return res;
		}))
	}

}
