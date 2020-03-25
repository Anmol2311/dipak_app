import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../module/user';
import * as _ from '../constants/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = `${environment.apiURL}/${'user'}`;
  constructor(private _http: HttpClient) { }

  // initialize form group
  public form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required, Validators.pattern(_.nameRegex)]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern(_.nameRegex)]),
    emailId: new FormControl(null, [Validators.required, Validators.pattern(_.emailRegex)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(_.passwordRegex)]),
    contact: new FormControl(null, [Validators.required, Validators.pattern(_.contactRegex)]),
    gender: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
  })

  // initialize loginForm group
  public loginForm: FormGroup = new FormGroup({
    emailId: new FormControl(null, [Validators.required, Validators.pattern(_.emailRegex)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(_.passwordRegex)]),
    role: new FormControl(null, [Validators.required])
  })

  // set default value to form
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      contact: '',
      gender: '',
      role: ''
    })
  }

   // set default value to form
   initializeLoginFormGroup() {
    this.loginForm.setValue({
      emailId: '',
      password: '',
      role: ''
    })
  }

  // get all users
  getUsers() {
    const apiURL = this.baseURL;
    return this._http.get<User[]>(apiURL);
  }

  // get single user
  getSingleUser(id: number) {
    const apiURL = `${this.baseURL+'?id'}=${id}`;
    return this._http.get<User>(apiURL);
  }

  // insert user
  insertUser(employee:User) {
    const userObj = {
      firstName: employee.firstName.toLowerCase(),
      lastName: employee.lastName.toLowerCase(),
      emailId: employee.emailId.toLowerCase(),
      password: employee.password,
      contact: employee.contact,
      gender: employee.gender,
      role: employee.role
    }
    const apiURL = this.baseURL;
    return this._http.post(apiURL, userObj);
  }

  // populate form or set current user 
  populateForm(employee:User) {
    this.form.setValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      emailId: employee.emailId,
      password: employee.password,
      contact: employee.contact,
      gender: employee.gender,
      role: employee.role
    });
  }

  // update user
  updateUser(employee:User) {
    const userObj = {
      id: employee.id,
      firstName: employee.firstName.toLowerCase(),
      lastName: employee.lastName.toLowerCase(),
      emailId: employee.emailId.toLowerCase(),
      password: employee.password,
      contact: employee.contact,
      gender: employee.gender,
      role: employee.role
    }
    const apiURL = `${this.baseURL+'?id'}=${employee.id}`;
    // const url = `${_.baseURL}/${employee.id}`;
    return this._http.put(apiURL, userObj);
  }

  // delete user
  deleteEmployee(id:number) {
    const apiURL = `${this.baseURL+'?id'}=${id}`;
    return this._http.delete(apiURL);
  }
}
