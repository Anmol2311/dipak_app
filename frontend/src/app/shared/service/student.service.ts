import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from '../constants/constants';
import { Student } from '../module/student';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseURL:string = `${environment.apiURL}/${'student'}`;

  constructor(private _http: HttpClient, private datePipe: DatePipe) { }

  // initialize form group
  public form: FormGroup = new FormGroup({
    id: new FormControl(null),
    fname: new FormControl(null, [Validators.required, Validators.pattern(_.nameRegex)]),
    lname: new FormControl(null, [Validators.required, Validators.pattern(_.nameRegex)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(_.emailRegex)]),
    dob: new FormControl('', [Validators.required]),
    contact: new FormControl(null, [Validators.required, Validators.pattern(_.contactRegex)]),
    gender: new FormControl(null, [Validators.required]),
    organization: new FormControl(null, [Validators.required]),
    branch: new FormControl(null),
    pnrNo: new FormControl(null, [Validators.pattern(_.pnrNo)])
  })

  // initialize loginForm group
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(_.emailRegex)]),
    dob: new FormControl('', [Validators.required])
  })

  // set default value to form
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      fname: '',
      lname: '',
      email: '',
      dob: '',
      contact: '',
      gender: '',
      organization: '',
      branch: null,
      pnrNo: null
    })
  }

  // set default value to form
  initializeLoginFormGroup() {
    this.loginForm.setValue({
      email: '',
      dob: ''
    })
  }

  // get all students
  getStudents() {
    const apiURL = this.baseURL;
    return this._http.get<Student[]>(apiURL);
  }

  // get single student
  getSingleStudent(id: number) {
    const apiURL = `${this.baseURL+'?id'}=${id}`;
    return this._http.get<Student>(apiURL);
  }

  // insert student
  insertStudent(student: Student) {
    const studentObj = {
      fname: student.fname.toLowerCase(),
      lname: student.lname.toLowerCase(),
      email: student.email.toLowerCase(),
      dob: student.dob == '' ? '' : this.datePipe.transform(student.dob, 'MM/dd/yyyy'),
      contact: student.contact,
      gender: student.gender,
      organization: student.organization,
      branch: student.branch,
      pnrNo: student.pnrNo
    }
    const apiURL = this.baseURL;
    return this._http.post(apiURL, studentObj);
  }

  // populate form or set current student 
  populateForm(student: Student) {
    this.form.setValue({
      id: student.id,
      fname: student.fname.toLowerCase(),
      lname: student.lname.toLowerCase(),
      email: student.email.toLowerCase(),
      dob: student.dob == '' ? '' : this.datePipe.transform(student.dob, 'yyyy-MM-dd'),
      contact: student.contact,
      gender: student.gender,
      organization: student.organization,
      branch: student.branch,
      pnrNo: student.pnrNo
    });
  }

  // update student
  updateStudent(student: Student) {
    const studentObj = {
      id: student.id,
      fname: student.fname.toLowerCase(),
      lname: student.lname.toLowerCase(),
      email: student.email.toLowerCase(),
      dob: this.datePipe.transform(student.dob, 'yyyy-MM-dd'),
      contact: student.contact,
      gender: student.gender,
      organization: student.organization,
      branch: student.branch,
      pnrNo: student.pnrNo
    }
    const apiURL = `${this.baseURL+'?id'}=${student.id}`;
    return this._http.put(apiURL, studentObj);
  }

  // delete student
  deleteStudent(id: number) {
    const apiURL = `${this.baseURL+'?id'}=${id}`;
    return this._http.delete(apiURL);
  }

}
