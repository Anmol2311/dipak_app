import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [VoucherListComponent],
  imports: [
    CommonModule,
    VoucherRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[VoucherListComponent]
})
export class VoucherModule { 
  constructor(){
    // console.log('Voucher Module');
  }
}
