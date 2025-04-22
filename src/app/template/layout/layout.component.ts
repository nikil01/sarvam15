import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/partials/header/header.component';
import { FooterComponent } from '../../shared/partials/footer/footer.component';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

	windowScrolled = false;

	constructor(private authService: AuthService){}

	  ngOnInit() {
	    window.addEventListener('scroll', () => {
	      this.windowScrolled = window.pageYOffset !== 0;
	    });
	  }

	  scrollToTop(): void {
	    window.scrollTo(0, 0);
	  }

	  onLogout(): void{
			this.authService.logout();
			sessionStorage.clear()
		}
}
