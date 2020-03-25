import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../constants/constants';
import { Exam } from '../module/exam';
import { Question } from '../module/question';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  public selected:number = null;
  baseURL:string = `${environment.apiURL}/${'question'}`;
  examURL:string = `${environment.apiURL}/${'exam'}`;
  queURL:string = `${environment.apiURL}/${'uploadQue'}`;

  // initialize form group
  public form: FormGroup = new FormGroup({
    id: new FormControl(null),
    examCode: new FormControl(null, [Validators.required]),
    question:new FormControl(null,[Validators.required]),
    a: new FormControl(null, [Validators.required]),
    b: new FormControl(null, [Validators.required]),
    c: new FormControl(null, [Validators.required]),
    d: new FormControl(null, [Validators.required]),
    answer: new FormControl(null, [Validators.required]),
  })

  // set default value to form
  initializeFormGroup(code: number) {
    this.form.setValue({
      id: null,
      examCode: code,
      question:'',
      a: '',
      b: '',
      c: '',
      d: '',
      answer: ''
    })
  }

  // populate form or set current question 
  populateForm(que:Question) {
    this.form.setValue({
      id: que.id,
      examCode: que.examCode,
      question:que.question,
      a: que.a,
      b: que.b,
      c: que.c,
      d: que.d,
      answer: que.answer
    });
  }

  // get exam list
  getExams() {
    const apiURL = this.examURL;
    return this._http.get<Exam[]>(apiURL);
  }

  // get questions
  getQuestions() {
    const apiURL = this.baseURL;
    return this._http.get<Question[]>(apiURL);
  }

  // insert question
  insertQuestion(que:Question) {
    const userObj = {
      id: que.id,
      examCode: que.examCode,
      question: que.question,
      a: que.a,
      b: que.b,
      c: que.c,
      d: que.d,
      answer: que.answer
    }
    const apiURL = this.baseURL;
    return this._http.post(apiURL, userObj);
  }

  // update question
  updateQuestion(que:Question) {
    const userObj = {
      id: que.id,
      examCode: que.examCode,
      question:que.question,
      a: que.a,
      b: que.b,
      c: que.c,
      d: que.d,
      answer: que.answer
    }
    const apiURL = `${this.baseURL+'?id'}=${que.id}`;
    return this._http.put(apiURL, userObj);
  }

  // delete question
  deleteQuestion(id:number) {
    const apiURL = `${this.baseURL+'?id'}=${id}`;
    return this._http.delete(apiURL);
  }

  uploadQueCSV(data:any){
    return this._http.post(this.queURL,data);
  }
}
