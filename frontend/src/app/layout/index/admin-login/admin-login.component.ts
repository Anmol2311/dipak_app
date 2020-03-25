import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { Router, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { NotificationService } from 'src/app/shared/service/notification.service';
import * as _ from 'src/app/shared/constants/constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  roles = _.roles;
  hide = true;
  loading:boolean = false;
  currentYear:number;
  constructor(
    public userService:UserService,
    private router:Router,
    private notificationService:NotificationService,
    private titleService:Title
  ) {
    this.titleService.setTitle('Admin Login');
    this.currentYear = new Date().getFullYear();
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
   }

  ngOnInit() {
    sessionStorage.clear();
    this.userService.loginForm.reset();
  }

  // admin login
  onAdminLogin() {

    let uemail = this.userService.loginForm.controls['emailId'].value;
    let upass = this.userService.loginForm.controls['password'].value;
    let urole = this.userService.loginForm.controls['role'].value;

    // console.log(uemail, upass);
    this.userService.getUsers().subscribe(
      res => {
        let data = res.filter(d => (d.emailId == uemail && d.password == upass && d.role == urole));

        if (data.length > 0) {
          sessionStorage.setItem('adminTokenId', btoa(data[0].id.toString()));
          if (urole == _.roles[0]) {
            this.router.navigate(['/admin-dashboard']);
          }
          else if (urole == _.roles[1]) {
            this.router.navigate(['/trainer-dashboard']);
          }
        }
        else {
          this.notificationService.warn(':: Invalid Email or Password or Role');
          this.userService.initializeLoginFormGroup();
        }
      }
    )
    // console.log(this.userService.loginForm.value);
  }

  // getErrorEmail() {
  //   return this.studentService.loginForm.get('email').hasError('required') ? _.requiredError :
  //     this.studentService.loginForm.get('email').hasError('pattern') ? _.emailError : '';
  // }

  getErrorAdminEmail() {
    return this.userService.loginForm.get('emailId').hasError('required') ? _.requiredError :
      this.userService.loginForm.get('emailId').hasError('pattern') ? _.emailError : '';
  }

  getErrorPassword() {
    return this.userService.loginForm.get('password').hasError('required') ? _.requiredError :
      this.userService.loginForm.get('password').hasError('pattern') ? _.passwordError : '';
  }

  getErrorRole() {
    return this.userService.loginForm.get('role').hasError('required') ? _.requiredError : '';
  }

}
