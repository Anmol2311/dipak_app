import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as _ from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Voucher } from '../module/voucher';
import { Question } from '../module/question';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  public voucherCode = new FormControl(null, [Validators.required, Validators.pattern(_.voucher)]);
  public selectExam = new FormControl(null, [Validators.required]);
  public totalQuestion: number = 0;
  baseURL: string = `${environment.apiURL}/${'quizQuestion'}`;
  voucherURL: string = `${environment.apiURL}/${'voucher'}`;
  resultURL: string = `${environment.apiURL}/${'result'}`;
  constructor(private _http: HttpClient) { }

  getVoucher() {
    // const apiURL = `${_.baseURL}/${_.vouchers}`;
    return this._http.get<Voucher[]>(this.voucherURL);
  }

  insertResult(resultObj: any) {
    // const apiURL = `${_.baseURL}/${_.result}`;
    return this._http.post(this.resultURL, resultObj);
  }

  getRandomQuestion(examCode: number) {
    const apiURL = `${this.baseURL + '?examCode'}=${examCode}`;
    return this._http.get<Question[]>(apiURL);
  }
}
