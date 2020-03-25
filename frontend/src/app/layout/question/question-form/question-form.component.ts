import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/shared/service/question.service';
import * as _ from 'src/app/shared/constants/constants';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  answers = _.answers;
  constructor(
    public questionService: QuestionService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<QuestionFormComponent>
  ) { }

  ngOnInit() {
  }

  // reset button
  onClear() {
    this.questionService.form.reset();
    this.questionService.initializeFormGroup(this.questionService.selected);
  }

  // close button
  onClose() {
    this.questionService.form.reset();
    this.questionService.initializeFormGroup(this.questionService.selected);
    this.dialogRef.close();
  }

  // submit button
  onSubmit() {
    if (this.questionService.form.valid) {
      if (!this.questionService.form.get('id').value) {
        this.questionService.insertQuestion(this.questionService.form.value).subscribe(
          () => {
            this.questionService.form.reset();
            this.questionService.initializeFormGroup(this.questionService.selected);
            this.notificationService.success(':: Question Inserted Successfully');
            this.onClose();
          }
        ); // insert question
      }
      else {
        this.questionService.updateQuestion(this.questionService.form.value).subscribe(
          () => {
            this.questionService.form.reset();
            this.questionService.initializeFormGroup(this.questionService.selected);
            this.notificationService.success(':: Question Updated Successfully');
            this.onClose();
          }
        ); // update question
      }
    }
  }

  // error methods
  getErrorQuestion() {
    return this.questionService.form.get('question').hasError('required') ? _.requiredError : '';
  }
  getErrorOptionA() {
    return this.questionService.form.get('a').hasError('required') ? _.requiredError : '';
  }
  getErrorOptionB() {
    return this.questionService.form.get('b').hasError('required') ? _.requiredError : '';
  }
  getErrorOptionC() {
    return this.questionService.form.get('c').hasError('required') ? _.requiredError : '';
  }
  getErrorOptionD() {
    return this.questionService.form.get('d').hasError('required') ? _.requiredError : '';
  }

}
