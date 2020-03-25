import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StudentService } from 'src/app/shared/service/student.service';
import * as _ from 'src/app/shared/constants/constants';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  gender: string[] = _.gender;
  branches: string[] = _.branches;
  organizations: string[] = _.organizations;
  isBranch: boolean = false;
  isPNR: boolean = false;
  invalidEmail: boolean = false;
  @ViewChild('email') email: ElementRef;
  constructor(
    public studentService: StudentService,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }

  // reset button
  onClear() {
    this.studentService.form.reset();
    this.invalidEmail = false;
    // this.studentService.initializeFormGroup();
  }

  // close button
  onClose() {
    this.studentService.form.reset();
    this.studentService.initializeFormGroup();
    this.dialogRef.close();
  }

  checkEmail(event) {
    // console.log(event.target.value);
    this.studentService.getStudents().subscribe(
      res => {
        let data = res.filter(r => r.email === event.target.value);
        if (data.length != 0) {
          this.email.nativeElement.focus();
          this.email.nativeElement.style.color = "red";
          this.invalidEmail = true;
        } else {
          this.email.nativeElement.style.color = "initial";
          this.invalidEmail = false;
        }
      }
    )
  }

  orgsDetails(orgn: string) {
    switch (orgn) {
      case 'hematite':
        this.isBranch = false;
        this.isPNR = false;
        this.studentService.form.controls['pnrNo'].setValue(null);
        this.studentService.form.controls['branch'].setValue(null);
        break;
      case 'lighthouse':
        this.isBranch = true;
        this.isPNR = false;
        this.studentService.form.controls['pnrNo'].setValue(null);
        break;
      case 'cdac':
        this.isBranch = false;
        this.isPNR = true;
        this.studentService.form.controls['branch'].setValue(null);
        break;
      default:
        this.isBranch = false;
        this.isPNR = false;
    }
  }

  // submit button
  onSubmit() {
    if (this.studentService.form.valid) {
      if (!this.studentService.form.get('id').value) {
        this.studentService.insertStudent(this.studentService.form.value).subscribe(
          () => {
            this.studentService.form.reset();
            this.studentService.initializeFormGroup();
            this.notificationService.success(':: Student Inserted Successfully');
            this.onClose();
          }
        ); // insert student
      }
      else {
        this.studentService.updateStudent(this.studentService.form.value).subscribe(
          () => {
            this.studentService.form.reset();
            this.studentService.initializeFormGroup();
            this.notificationService.success(':: Student Updated Successfully');
            this.onClose();
          }
        ); // update student
      }
    }
  }

  // error methods

  getErrorFirstName() {
    return this.studentService.form.get('fname').hasError('required') ? _.requiredError :
      this.studentService.form.get('fname').hasError('pattern') ? _.nameError : '';
  }

  getErrorLastName() {
    return this.studentService.form.get('lname').hasError('required') ? _.requiredError :
      this.studentService.form.get('lname').hasError('pattern') ? _.nameError : '';
  }

  getErrorEmail() {
    return this.studentService.form.get('email').hasError('required') ? _.requiredError :
      this.studentService.form.get('email').hasError('pattern') ? _.emailError : this.invalidEmail == true ? 'Email Already Exist' : '';
  }

  getErrorContact() {
    return this.studentService.form.get('contact').hasError('required') ? _.requiredError :
      this.studentService.form.get('contact').hasError('pattern') ? _.contactError : '';
  }

  getErrorPnrNo() {
    return this.studentService.form.get('pnrNo').hasError('pattern') ? _.pnrNoError : '';
  }

}
