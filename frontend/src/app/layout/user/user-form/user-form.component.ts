import { Component, OnInit } from '@angular/core';
import * as _ from 'src/app/shared/constants/constants';
// import {gender,} from '../../shared/constants/constants';
import { UserService } from 'src/app/shared/service/user.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { MatDialogRef } from '@angular/material';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class UserFormComponent implements OnInit {

  hide = true;
  gender = _.gender;
  roles = _.roles;
 
  constructor(
    public userService: UserService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<UserFormComponent>) { }

  ngOnInit() {
  }

  // reset button
  onClear() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
  }

  // close button
  onClose() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
  }

  // submit button
  onSubmit() {
    if (this.userService.form.valid) {
      if (!this.userService.form.get('id').value) {
        this.userService.insertUser(this.userService.form.value).subscribe(
          () => {
            this.userService.form.reset();
            this.userService.initializeFormGroup();
            this.notificationService.success(':: User Inserted Successfully');
            this.onClose();
          }
        ); // insert user
      }
      else {
        this.userService.updateUser(this.userService.form.value).subscribe(
          () => {
            this.userService.form.reset();
            this.userService.initializeFormGroup();
            this.notificationService.success(':: User Updated Successfully');
            this.onClose();
          }
        ); // update user
      }

    }
  }

  // error methods

  getErrorFirstName() {
    return this.userService.form.get('firstName').hasError('required') ? _.requiredError :
      this.userService.form.get('firstName').hasError('pattern') ? _.nameError : '';
  }

  getErrorLastName() {
    return this.userService.form.get('lastName').hasError('required') ? _.requiredError :
      this.userService.form.get('lastName').hasError('pattern') ? _.nameError : '';
  }

  getErrorEmail() {
    return this.userService.form.get('emailId').hasError('required') ? _.requiredError :
      this.userService.form.get('emailId').hasError('pattern') ? _.emailError : '';
  }

  getErrorPassword() {
    return this.userService.form.get('password').hasError('required') ? _.requiredError :
      this.userService.form.get('password').hasError('pattern') ? _.passwordError : '';
  }

  getErrorContact() {
    return this.userService.form.get('contact').hasError('required') ? _.requiredError :
      this.userService.form.get('contact').hasError('pattern') ? _.contactError : '';
  }

  getErrorGender() {
    return this.userService.form.get('gender').hasError('required') ? _.requiredError : '';
  }

  getErrorRole() {
    return this.userService.form.get('role').hasError('required') ? _.requiredError : '';
  }
}
