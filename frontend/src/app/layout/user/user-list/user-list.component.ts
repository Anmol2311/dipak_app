import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UserFormComponent } from '../user-form/user-form.component';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { User } from 'src/app/shared/module/user';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userData: MatTableDataSource<any>;
  displayedColumns: string[] = ['srNo', 'fullName', 'email', 'contact', 'role', 'actions'];
  searchKey: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService) {
    dialog.afterAllClosed.subscribe(
      () => {
        this.fetchUserList();
      }
    )
  }

  ngOnInit() {
    this.fetchUserList();
  }

  // get all users
  fetchUserList() {
    this.userService.getUsers().subscribe(
      res => {
        let data = res.map((obj, index) => ({ ...obj, position: index + 1 + '.' }))
        this.userData = new MatTableDataSource(data);
        this.userData.paginator = this.paginator;

      }
    )
  }

  // clear searchbox
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  // filter input
  applyFilter() {
    this.userData.filter = this.searchKey.trim().toLowerCase();
  }

  // popup for insert user
  onCreate() {
    this.userService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(UserFormComponent, dialogConfig);
  }

  // popup for edit user
  onEdit(row: User) {
    this.userService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(UserFormComponent, dialogConfig);
  }

  // delete user
  onDelete(id: number) {
    this.openConfirmDialog('Are you sure to delete this user ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.userService.deleteEmployee(id).subscribe(
            () => {
              this.notificationService.warn(':: User Deleted successfully');
              this.fetchUserList();
            }
          )
        }
      });
  }

  openConfirmDialog(msg:string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '390px';
    dialogConfig.panelClass = 'confirm-dialog-container';
    dialogConfig.disableClose = true;
    dialogConfig.position = { top: "100px" };
    dialogConfig.data = {
      message: msg
    }
    return this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

}
