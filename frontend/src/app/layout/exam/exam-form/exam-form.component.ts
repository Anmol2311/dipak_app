import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { MatDialogRef } from '@angular/material';
import { ExamService } from 'src/app/shared/service/exam.service';
import * as _ from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {

  examCode: number = 0;
  constructor(
    public examService: ExamService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ExamFormComponent>
    ) { }

  ngOnInit() {
    this.examService.getExams().subscribe(
      res => {
        this.examCode = Math.max(...res.map(data => data.examCode), 0);
      }
    )
  }

  // reset button
  onClear() {
    this.examService.form.reset();
    // this.dialogRef.close();
  }

  // close button
  onClose() {
    this.examService.form.reset();
    this.dialogRef.close();
  }

  // submit button
  onSubmit() {
    if (this.examService.form.valid) {
      this.examService.insertExam(this.examService.form.value, this.examCode + 1).subscribe(
        () => {
          this.examService.form.reset();
          this.notificationService.success(':: Exam Inserted Successfully');
          this.onClose();
        }
      ); // insert exam
    }
  }

  // get first name error
  getErrorExamName() {
    return this.examService.form.get('examName').hasError('required') ? _.requiredError :
      this.examService.form.get('examName').hasError('pattern') ? _.examNameError : '';
  }

}
