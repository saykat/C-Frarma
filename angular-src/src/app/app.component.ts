import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: ' <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: \'0px\' }"></ngx-loading>\n' +
  '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  loading: boolean= false;
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}
