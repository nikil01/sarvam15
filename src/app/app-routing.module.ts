import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ExtraOptions } from '@angular/router';

import { LayoutComponent } from './template/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { Constant } from './shared/constant';

import { AuthGuard } from './core/guards/auth.guard';

// canActivate: [AuthGuard],

const routes: Routes = [
	{path: '', component: LayoutComponent,
	children: [
		{path:'home',component:HomeComponent, title:'Home'},
		{path: 'search', loadComponent: () => import('./pages/search/search.component').then((x) => x.SearchComponent), title:'Search Results'},

		{path: 'track-order', loadComponent: () => import('./pages/trackorder/trackorder.component').then((x) => x.TrackorderComponent), title:'Track Order'},
		{path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then((x) => x.SignupComponent), title:'Signup'},
		{path: 'signup-confirm', loadComponent: () => import('./pages/signupotp/signupotp.component').then((x) => x.SignupotpComponent), title:'Signup Confirm'},
		{path: 'signin', loadComponent: () => import('./pages/signin/signin.component').then((x) => x.SigninComponent), title:'signin'},
		{path: 'signin-pass', loadComponent: () => import('./pages/signin-pwd/signinpwd.component').then((x) => x.SigninpwdComponent), title:'signin'},
		{path: 'signin-otp', loadComponent: () => import('./pages/signin-otp/signinotp.component').then((x) => x.SigninotpComponent), title:'signin'},

		{path: 'profile', loadComponent: () => import('./pages/myprofile/myprofile.component').then((x) => x.MyprofileComponent), title:'My Profile'},
		{path: 'orderhistory', loadComponent: () => import('./pages/orderhistory/orderhistory.component').then((x) => x.OrderhistoryComponent), title:'My Order History'},
		{path: 'reset-password', loadComponent: () => import('./pages/pwdreset/pwdreset.component').then((x) => x.PwdresetComponent), title:'Change Password'},
		{path: 'change-password', loadComponent: () => import('./pages/resetpwd/resetpwd.component').then((x) => x.ResetpwdComponent), title:'Reset Password'},

		{path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then((x) => x.CartComponent), title:'Cart'},
		{path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist.component').then((x) => x.WishlistComponent), title:'My Wishlist'},
		{path: 'checkout/:coupon/:type', loadComponent: () => import('./pages/checkout/checkout.component').then((x) => x.CheckoutComponent), title:'Checkout'},

		{path: 'about', loadComponent: () => import('./pages/aboutus/aboutus.component').then((x) => x.AboutusComponent), title:'About Us'},
		
		{path: 'elite-products', loadComponent: () => import('./pages/catalogue/catalogue.component').then((x) => x.CatalogueComponent), title:'Elite Product Catalogue'},
		{path: 'elite-product/:prdid', loadComponent: () => import('./pages/elitedetails/elitedetails.component').then((x) => x.ElitedetailsComponent), title:'Elite Product Details'},

		{path: 'shopnow', loadComponent: () => import('./pages/shopnow/shopnow.component').then((x) => x.ShopnowComponent), title:'Shop Online'},
		{path: 'product/:prdid', loadComponent: () => import('./pages/productdetails/productdetails.component').then((x) => x.ProductdetailsComponent), title:'Product Detail'},

		{path: 'blogs', loadComponent: () => import('./pages/blogread/blogread.component').then((x) => x.BlogreadComponent), title:'Read Blog'},
		{path: 'blog', loadComponent: () => import('./pages/bloglist/bloglist.component').then((x) => x.BloglistComponent), title:'Blogs'},
		
		{path: 'events', loadComponent: () => import('./pages/events/events.component').then((x) => x.EventsComponent), title:'Webinar'},
		{path: 'event/:evntid/:title', loadComponent: () => import('./pages/eventdetails/eventdetails.component').then((x) => x.EventdetailsComponent), title:'Webinar'},
		{path: 'eventsignup/:evntid/:title', loadComponent: () => import('./pages/eventsignup/eventsignup.component').then((x) => x.EventsignupComponent), title:'Webinar Registration'},
		{path: 'eventregconfirm', loadComponent: () => import('./pages/eventconfirm/eventconfirm.component').then((x) => x.EventconfirmComponent), title:'Event Registration Confirm'},
		{path: 'eventpayment/:epid/:evntid', loadComponent: () => import('./pages/eventpayment/eventpayment.component').then((x) => x.EventpaymentComponent), title:'Event Registration Payment'},
		{path: 'thankyou/:epid/:evntid/:transid/:result', loadComponent: () => import('./pages/thankyou/thankyou.component').then((x) => x.ThankyouComponent), title:'Shopping Payment'},

		{path: 'contact', loadComponent: () => import('./pages/contactus/contactus.component').then((x) => x.ContactusComponent), title:'Contact Us'},

		{path: 'terms-conditions', loadComponent: () => import('./pages/termsnconditions/termsnconditions.component').then((x) => x.TermsnconditionsComponent), title:'Terms & Conditions'},
		{path: 'return-policy', loadComponent: () => import('./pages/businesspolicy/businesspolicy.component').then((x) => x.BusinesspolicyComponent), title:'Return Policy'},
		{path: 'payment-methods', loadComponent: () => import('./pages/paymentmethods/paymentmethods.component').then((x) => x.PaymentmethodsComponent), title:'Payment Methods'},
		

		{path: 'album', loadComponent: () => import('./pages/album/album.component').then((x) => x.AlbumComponent), title:'Photo Gallery'},
		{path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then((x) => x.GalleryComponent), title:'Photo Gallery'},
		{path: 'news', loadComponent: () => import('./pages/news/news.component').then((x) => x.NewsComponent), title:'News'},
		
		{path: 'career', loadComponent: () => import('./pages/career/career.component').then((x) => x.CareerComponent), title:'Job Openings'},
		{path: 'job-apply', loadComponent: () => import('./pages/applyforjob/applyforjob.component').then((x) => x.ApplyforjobComponent), title:'Apply For Job'},
		{path: 'faq', loadComponent: () => import('./pages/faq/faq.component').then((x) => x.FaqComponent), title:'Frequently Asked Questions'},
		{path: 'catalogue', loadComponent: () => import('./pages/flipbooks/flipbooks.component').then((x) => x.FlipbooksComponent), title:'Sarvam Catalogue'},
		{path: 'training', loadComponent: () => import('./pages/training/training.component').then((x) => x.TrainingComponent), title:'Sarvam Training'},
		
		
		{path: 'order', loadComponent: () => import('./pages/order/order.component').then((x) => x.OrderComponent), title:'My Orders'},
		
		
		
		
		{path: 'support', loadComponent: () => import('./pages/support/support.component').then((x) => x.SupportComponent), title:'Support'},
		
		

		{path:'',redirectTo:'home', pathMatch:'full'},
		{path:'**',component:PagenotfoundComponent, title:Constant.BASE_URL+' 404, Page Not Found'},
		{path:'page-not-found',component:PagenotfoundComponent, title:Constant.BASE_URL+' 404, Page Not Found'},
	]}
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload', //Must have if you want to be able to use the anchor more than once
  scrollPositionRestoration: 'top' 
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

