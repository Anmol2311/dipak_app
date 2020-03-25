import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { VoucherService } from 'src/app/shared/service/voucher.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { Voucher } from 'src/app/shared/module/voucher';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit {

  voucherData: MatTableDataSource<any>;
  displayedColumns: string[] = ['srNo', 'voucherCode', 'voucherStatus'];
  // searchKey: string = "";
  flag: boolean | number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private voucherService: VoucherService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.fetchVoucherList();
  }

  // get voucher list
  fetchVoucherList() {
    this.voucherService.getVouchers().subscribe(
      res => {
        let data = res.map((obj, index) => ({ ...obj, position: index + 1 + '.' }))
        this.voucherData = new MatTableDataSource(data);
        this.voucherData.paginator = this.paginator;
      }
    )
  }

  // clear searchbox
  // onSearchClear() {
  //   this.searchKey = "";
  //   this.applyFilter();
  // }

  // filter input
  // applyFilter() {
  //   this.voucherData.filter = this.searchKey.trim().toLowerCase();
  // }

  // change status
  changeStatus(voucher: Voucher) {
    if (voucher.status == 0) {
      this.flag = 1;
      this.voucherService.updateVoucher(voucher, this.flag).subscribe(
        () => {
          this.notificationService.success(':: Voucher Enabled Successfully');
          this.fetchVoucherList();
        }
      )
    }
    else {
      this.flag = 0;
      this.voucherService.updateVoucher(voucher, this.flag).subscribe(
        () => {
          this.notificationService.warn(':: Voucher Disabled Successfully');
          this.fetchVoucherList()
        }
      )
    }
  }

}
