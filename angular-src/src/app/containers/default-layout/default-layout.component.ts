import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public loading = true;
  public options = {
    position: ["top", "right"],
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: false,
    clickIconToClose: true
  }


  constructor(
              private authService: AuthService,
              private router: Router
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  logout(){
    this.authService.logout();
    // this.flashMessage.show('successfully loged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
  }
}
