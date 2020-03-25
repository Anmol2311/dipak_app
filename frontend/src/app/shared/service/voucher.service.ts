import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../constants/constants';
import { Voucher } from '../module/voucher';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  baseURL:string = `${environment.apiURL}/${'voucher'}`;
  constructor(private _http: HttpClient) { }

  // get all vouchers
  getVouchers() {
    const apiURL = this.baseURL;
    return this._http.get<Voucher[]>(apiURL);
  }

  // update voucher
  updateVoucher(voucher: Voucher, flag: boolean | number) {
    const voucherObj = {
      id: voucher.id,
      voucherCode: voucher.voucherCode,
      status: flag
    }
    const apiURL = `${this.baseURL+'?id'}=${voucher.id}`;
    return this._http.put(apiURL, voucherObj);
  }

}
