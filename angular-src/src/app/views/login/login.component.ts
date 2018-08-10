import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent  implements OnInit {

  public loading = false;
  username: String;
  password: String;

  constructor(
                 private authService : AuthService,
                 private router: Router,
                 private notificationService: NotificationsService
  ){}
  ngOnInit() {
  }

  onLoginSubmit(){

    this.loading = true;
    const user = {
      username : this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        console.log(data)
        this.authService.storeUserData(data.token, data.user);
        this.loading = false;
        this.router.navigate(['/dashboard'])
      }else{
        alert('failed')
        this.loading = false;
      }
    })
  }

}
