import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionService } from 'src/app/shared/service/question.service';
import { Exam } from 'src/app/shared/module/exam';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { Question } from 'src/app/shared/module/question';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionListComponent implements OnInit {

  exams: Exam[] = [];
  position = 0;
  questions = [];
  questionData: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'question'];
  expandedElement: Question | null;
  // searchKey: string = "";
  isFile: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  getFile(value) {
    let file = value;
    // let myFile = event.target.files[0];
    // if(myFile.type != 'application/csv'){
    //   alert('invalid');
    // }
    // console.log(myFile.type);
    this.isFile = file;
    // this.isFile = file;
  }

  @ViewChild('uploadCSV') fileInput:NgModel;

  uploadSubmit() {
    // let data = {
    //   examCode: this.questionService.selected,
    //   uploadCSV: this.isFile
    // }
    let files = this.ele.nativeElement.querySelector('#selectFile').files;
    let formData = new FormData();
    let myfile = files[0];
    formData.append('selectFile',myfile,myfile.name);
    this.questionService.uploadQueCSV(formData).subscribe(
      (res) => {
      
        // this.fetchQuestionList();
        if(res[0].message == "success"){
          // console.log(res[0].message);
          this.notificationService.success(': : Question Uploaded Successfully');
        }else{
          this.notificationService.warn(': : Failed to Upload');
        }
        this.fileInput.reset();
        this.isFile = "";
        this.changeExam(this.questionService.selected);
      }
    );
    // console.log(formData.get('selectFile'));
  }
  constructor(
    public questionService: QuestionService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private ele: ElementRef
  ) {
    dialog.afterAllClosed.subscribe(
      () => {
        this.getEnabledExam();
        this.fetchQuestionList();
      }
    )
  }

  ngOnInit() {
    this.getEnabledExam();
    // this.fetchQuestionList();
    this.questionService.selected = null;
  }

  // get enabled exam
  getEnabledExam() {
    this.questionService.getExams().subscribe(
      res => {
        // this.exams = res.filter(exam => exam.examStatus == true);
        this.exams = res;
      }
    )
  }

  // get exam code
  changeExam(code: number) {
    this.questionService.selected = code;
    // console.log(this.questionService.selected);
    this.fetchQuestionList();
  }

  // get all question
  fetchQuestionList() {
    this.questionService.getQuestions().subscribe(
      res => {
        // console.log(res);
        this.questions = res.filter(x => x.examCode == this.questionService.selected).map((obj, index) => ({ ...obj, position: index + 1 + '.' }));
        // console.log(this.questions);
        this.questionData = new MatTableDataSource(this.questions);
        this.questionData.paginator = this.paginator;
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
  //   this.questionData.filter = this.searchKey.trim().toLowerCase();
  // }

  // popup for insert question
  onCreate() {
    this.questionService.initializeFormGroup(this.questionService.selected);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(QuestionFormComponent, dialogConfig);
  }

  // popup for edit question
  onEdit(row: Question) {
    this.questionService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(QuestionFormComponent, dialogConfig);
  }

  // delete question
  onDelete(id: number) {
    this.openConfirmDialog('Are you sure to delete this question ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.questionService.deleteQuestion(id).subscribe(
            () => {
              this.notificationService.warn(':: Question Deleted successfully');
              this.fetchQuestionList();
            }
          )
        }
      });
  }

  openConfirmDialog(msg: string) {
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
