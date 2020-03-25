import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar, private dailog:MatDialog) { }

  // MatSnackBar config
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  }

  // success message
  success(msg:string) {
    this.config['panelClass'] = ['notification', 'success-message'];
    this.snackBar.open(msg, '', this.config);
  }

  // warning message
  warn(msg:string) {
    this.config['panelClass'] = ['notification', 'danger-message'];
    this.snackBar.open(msg, '', this.config);
  }

// logout
logout(){
  sessionStorage.clear();
}  

}
