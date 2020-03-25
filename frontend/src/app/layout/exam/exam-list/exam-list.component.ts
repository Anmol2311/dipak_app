import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ExamService } from 'src/app/shared/service/exam.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import * as _ from 'src/app/shared/constants/constants';
import { ExamFormComponent } from '../exam-form/exam-form.component';
import { Exam } from 'src/app/shared/module/exam';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  examData: MatTableDataSource<any>;
  displayedColumns: string[] = ['srNo', 'examCode', 'examName', 'examStatus', 'actions'];
  searchKey: string = "";
  flag: boolean | number;
  codePrefix: string = _.codePrefix;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private examService: ExamService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    dialog.afterAllClosed.subscribe(
      () => {
        this.fetchExamList();
      }
    )
  }

  ngOnInit() {
    this.fetchExamList();
  }

  // get exam list
  fetchExamList() {
    this.examService.getExams().subscribe(
      res => {
        let data = res.map((obj, index) => ({ ...obj, position: index + 1 + '.' }))
        this.examData = new MatTableDataSource(data);
        this.examData.paginator = this.paginator;
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
    this.examData.filter = this.searchKey.trim().toLowerCase();
  }

  // popup for insert exam
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%";
    this.dialog.open(ExamFormComponent, dialogConfig);
  }

  // change status
  changeStatus(exam: Exam) {
    if (exam.examStatus == 0) {
      this.flag = 1;
      this.examService.updateExam(exam, this.flag).subscribe(
        () => {
          this.notificationService.success(':: Exam Enabled Successfully');
          this.fetchExamList()
        }
      )
    }
    else {
      this.flag = 0;
      this.examService.updateExam(exam, this.flag).subscribe(
        () => {
          this.notificationService.warn(':: Exam Disabled Successfully');
          this.fetchExamList()
        }
      )
    }
  }

  // delete user
  onDelete(id: number) {
    this.openConfirmDialog('Are you sure to delete this exam ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.examService.deleteExam(id).subscribe(
            () => {
              this.notificationService.warn(':: Exam Deleted Successfully');
              this.fetchExamList();
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
