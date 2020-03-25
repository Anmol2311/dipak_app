import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../constants/constants';
import { Result } from '../module/result';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  baseURL:string = `${environment.apiURL}/${'result'}`;

  constructor(private _http:HttpClient) { }

  getResult(){
    const apiURL = this.baseURL;
    return this._http.get<Result[]>(apiURL);
  }

  deleteResult(id:number){
    const apiURL = `${this.baseURL+'?id'}=${id}`;
    return this._http.delete(apiURL);
  }
}
