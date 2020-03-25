import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentService } from 'src/app/shared/service/student.service';
import { Student } from 'src/app/shared/module/student';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentData: MatTableDataSource<any>;
  displayedColumns: string[] = ['srNo', 'fullName', 'email', 'contact', 'organization', 'actions'];
  searchKey: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService,
    private dialog: MatDialog,
    private notificationService: NotificationService) {
    dialog.afterAllClosed.subscribe(
      () => {
        this.fetchStudentList();
      }
    )
  }

  ngOnInit() {
    this.fetchStudentList();
  }

  // get all students
  fetchStudentList() {
    this.studentService.getStudents().subscribe(
      res => {
        let data = res.map((obj, index) => ({ ...obj, position: index + 1 + '.' }))
        this.studentData = new MatTableDataSource(data);
        this.studentData.paginator = this.paginator;

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
    this.studentData.filter = this.searchKey.trim().toLowerCase();
  }

  // popup for insert student
  onCreate() {
    this.studentService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(StudentFormComponent, dialogConfig);
  }

  // popup for edit student
  onEdit(row: Student) {
    this.studentService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(StudentFormComponent, dialogConfig);
  }

  // delete student
  onDelete(id: number) {
    this.openConfirmDialog('Are you sure to delete this student ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.studentService.deleteStudent(id).subscribe(
            () => {
              this.notificationService.warn(':: Student Deleted successfully');
              this.fetchStudentList();
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
