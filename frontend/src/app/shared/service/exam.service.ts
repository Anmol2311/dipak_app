import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../constants/constants';
import { Exam } from '../module/exam';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private _http: HttpClient) { }

  baseURL: string = `${environment.apiURL}/${'exam'}`;
  
  // initialize form group
  public form: FormGroup = new FormGroup({
    id: new FormControl(null),
    examCode: new FormControl(null),
    examName: new FormControl(null, [Validators.required, Validators.pattern(_.examNameRegex)]),
    examStatus: new FormControl(null, [Validators.required]),
  });

  // get all exams
  getExams() {
    const apiURL = this.baseURL;
    // return this._http.get<Exam[]>(apiURL);
    return this._http.get<Exam[]>(apiURL);
  }

  // insert user
  insertExam(exam: Exam, examCode: number) {
    const examObj = {
      examCode: examCode,
      examName: exam.examName.toLowerCase(),
      examStatus: exam.examStatus
    }
    const apiURL = this.baseURL;
    return this._http.post(apiURL, examObj);
  }

  // update user
  updateExam(exam: Exam, flag: boolean | number) {
    const examObj = {
      id: exam.id,
      examCode: exam.examCode,
      examName: exam.examName.toLowerCase(),
      examStatus: flag
    }
    const apiURL = `${this.baseURL + '?id'}=${exam.id}`;
    return this._http.put(apiURL, examObj);
  }

  // delete user
  deleteExam(id: number) {
    const apiURL = `${this.baseURL + '?id'}=${id}`;
    return this._http.delete(apiURL);
  }

}
