import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ResultService } from 'src/app/shared/service/result.service';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  resultData: MatTableDataSource<any>;
  displayedColumns: string[] = ['srNo', 'stdName', 'orgsName', 'branchName', 'examName', 'examTotalMarks','examObtainedMarks','status', 'grade', 'examDate', 'actions'];
  searchKey: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private notificationService: NotificationService,
    private resultService: ResultService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchResultList();
  }

  // get exam list
  fetchResultList() {
    this.resultService.getResult().subscribe(
      res => {
        let data = res.map((obj, index) => ({ ...obj, position: index + 1 + '.' }));
        // console.log(data);
        this.resultData = new MatTableDataSource(data);
        this.resultData.paginator = this.paginator;
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
    this.resultData.filter = this.searchKey.trim().toLowerCase();
  }

  // delete user
  onDelete(id: number) {
    this.openConfirmDialog('Are you sure to delete this result ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.resultService.deleteResult(id).subscribe(
            () => {
              this.notificationService.warn(':: Result Deleted successfully');
              this.fetchResultList();
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
