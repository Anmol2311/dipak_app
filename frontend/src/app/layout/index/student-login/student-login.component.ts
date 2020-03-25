import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/shared/service/student.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StudentFormComponent } from 'src/app/layout/student/student-form/student-form.component';
import * as _ from 'src/app/shared/constants/constants';
// import { StudentLogin } from 'src/app/shared/module/student';
import { DatePipe } from '@angular/common';
import { Router, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  @ViewChild('loginfrm') myForm: NgForm;

  // isAdmin: boolean;
  // isStudent: boolean;
  roles = _.roles;
  loading:boolean = false;
  // hide = true;
  currentYear:number;

  constructor(public studentService: StudentService,
    private dailog: MatDialog,
    private datePipe: DatePipe,
    private router: Router,
    private notificationService: NotificationService,
    private titleService:Title) {
      this.titleService.setTitle('Student Login');
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
    this.studentService.loginForm.reset();
    // this.userService.loginForm.reset();
    // console.log(this.router.url);
    // this.openLoginForm(this.router.url);
  }

  // openLoginForm(url: string) {
  //   if (url == '/login/hematite-admin') {
  //     this.isAdmin = true;
  //     this.isStudent = false;
  //   }
  //   else if (url == '/login') {
  //     this.isStudent = true;
  //     this.isAdmin = false;
  //   }
  // }

  // popup for insert student
  onCreate() {
    this.studentService.initializeLoginFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dailog.open(StudentFormComponent, dialogConfig);
  }

  // student login
  onStudentLogin() {

    let uemail = this.studentService.loginForm.controls['email'].value;
    let udob = this.datePipe.transform(this.studentService.loginForm.controls['dob'].value, 'MM/dd/yyyy');

    // console.log(uemail, udob);
    this.studentService.getStudents().subscribe(
      res => {
        let data = res.filter(d => (d.dob == udob && d.email == uemail));

        if (data.length > 0) {
          sessionStorage.setItem('tokenId', btoa(data[0].id.toString()));
          this.router.navigate(['/quiz']);
        }
        else {
          this.notificationService.warn(':: Invalid Email or DOB');
          this.studentService.initializeLoginFormGroup();
        }
      }
    )
    // console.log(this.studentService.loginForm.value);
  }

  // admin login
  // onAdminLogin() {

  //   let uemail = this.userService.loginForm.controls['emailId'].value;
  //   let upass = this.userService.loginForm.controls['password'].value;
  //   let urole = this.userService.loginForm.controls['role'].value;

  //   console.log(uemail, upass);
  //   this.userService.getUsers().subscribe(
  //     res => {
  //       let data = res.filter(d => (d.emailId == uemail && d.password == upass && d.role == urole));

  //       if (data.length > 0) {
  //         sessionStorage.setItem('adminTokenId', btoa(data[0].id.toString()));
  //         if (urole == _.roles[0]) {
  //           this.router.navigate(['/admin-dashboard']);
  //         }
  //         else if (urole == _.roles[1]) {
  //           this.router.navigate(['/trainer-dashboard']);
  //         }
  //       }
  //       else {
  //         this.notificationService.warn(':: Invalid Email or Password or Role');
  //         this.userService.initializeLoginFormGroup();
  //       }
  //     }
  //   )
  //   console.log(this.userService.loginForm.value);
  // }

  getErrorEmail() {
    return this.studentService.loginForm.get('email').hasError('required') ? _.requiredError :
      this.studentService.loginForm.get('email').hasError('pattern') ? _.emailError : '';
  }

  // getErrorAdminEmail() {
  //   return this.userService.loginForm.get('emailId').hasError('required') ? _.requiredError :
  //     this.userService.loginForm.get('emailId').hasError('pattern') ? _.emailError : '';
  // }

  // getErrorPassword() {
  //   return this.userService.loginForm.get('password').hasError('required') ? _.requiredError :
  //     this.userService.loginForm.get('password').hasError('pattern') ? _.passwordError : '';
  // }

  // getErrorRole() {
  //   return this.userService.loginForm.get('role').hasError('required') ? _.requiredError : '';
  // }
}
