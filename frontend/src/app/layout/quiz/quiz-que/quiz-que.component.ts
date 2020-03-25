import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from 'src/app/shared/service/quiz.service';
import * as _ from 'src/app/shared/constants/constants';
import { QuestionService } from 'src/app/shared/service/question.service';
import { Exam } from 'src/app/shared/module/exam';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { Question } from 'src/app/shared/module/question';
import { NgForm } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';
import { StudentService } from 'src/app/shared/service/student.service';
// import { Student } from 'src/app/shared/module/student';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quiz-que',
  templateUrl: './quiz-que.component.html',
  styleUrls: ['./quiz-que.component.css']
})
export class QuizQueComponent implements OnInit {

  isVoucher: boolean = true;
  isExam: boolean = false;
  isInstruction: boolean = false;
  isQuiz: boolean = false;
  exams: Exam[] = [];
  allQuestions: Question[] = [];
  options: string[] = _.answers;
  answerArray = [];
  totalAnswered: number = 0;
  rightAnswer: number;
  isResult: boolean = false;
  isCheckAns: boolean = false;
  totalPercent: number;
  grade: string = '';
  stdObj: any;
  clock: any = '';
  currentYear:number;
  @ViewChild("quizQues") quesTest: NgForm;
  constructor(private quizService: QuizService,
    private questionService: QuestionService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private studentService: StudentService,
    private router: Router,
    private titleService:Title) {
      this.titleService.setTitle('Hematite Infotech - Online Quiz');
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.getEnabledExam();
    let stdId = Number(atob(sessionStorage.getItem('tokenId')));
    this.getStudent(stdId);
  }

  getStudent(id: number) {
    this.studentService.getSingleStudent(id).subscribe(std => {
      this.stdObj = std[0];
      // console.log(this.stdObj);
    });
  }

  // get student name
  getStudentName() {
    return this.stdObj ? this.stdObj.fname + " " + this.stdObj.lname : '';
  }

  // get enabled exam
  getEnabledExam() {
    this.questionService.getExams().subscribe(
      res => {
        this.exams = res.filter(exam => exam.examStatus == true);
      }
    )
  }

  backVoucher() {
    this.isExam = false;
    this.isVoucher = true;
  }

  backExam() {
    this.isInstruction = false;
    this.isExam = true;
  }

  getErrorVoucher() {
    return this.quizService.voucherCode.hasError('required') ? _.requiredError :
      this.quizService.voucherCode.hasError('pattern') ? _.voucherError : '';
  }

  getErrorSelectExam() {
    return this.quizService.voucherCode.hasError('required') ? _.requiredError : '';
  }

  checkVoucher(voucher: string) {
    this.quizService.getVoucher().subscribe(
      (res) => {
        let validVoucher = res.filter(v => (v.voucherCode == voucher && v.status == 1));
        if (validVoucher[0]) {
          this.isVoucher = false;
          this.isExam = true;
        } else {
          this.notificationService.warn(':: Invalid Voucher');
        }
      }
    )
  }

  checkExam(exam: number) {
    // console.log(exam);

    this.isExam = false;
    this.isInstruction = true;
    // this.questionService.getQuestions().subscribe(
    //   res => {
    //     sessionStorage.setItem('examCode', btoa(exam.toString()))
    //     this.allQuestions = res.filter(que => (que.examCode === exam));
    //     console.log(this.allQuestions);
    //     this.quizService.totalQuestion = this.allQuestions.length;
    //   }
    // )
    this.quizService.getRandomQuestion(exam).subscribe(
      res => {
        sessionStorage.setItem('examCode', btoa(exam.toString()))
        this.allQuestions = res;
        // console.log(this.allQuestions);
        this.quizService.totalQuestion = this.allQuestions.length;
      }
    )
  }

  getTimer(value) {
    this.clock = value;
    return this.clock;
  }

  startQuiz() {
    this.isQuiz = true;
    this.isInstruction = false;
    for (let i = 0; i < this.allQuestions.length; i++) {
      if ("selected" in this.allQuestions[i]) {
        delete this.allQuestions[i]["selected"];
      }
    }

    // var timeleft = 15;

    // var downloadTimer = setInterval(() => {
    //   this.clock = timeleft;

    //   timeleft -= 1;
    //   if (timeleft <= 0) {
    //     clearInterval(downloadTimer);
    //     alert("Time is up!");
    //   }
    // }, 1000);

    var count = 3600;

    var downloadTimer = setInterval(() => {
      // var count = 20;
      count = count - 1;
      if (count == 600) {
        // clearInterval(counter);
        this.notificationService.warn('Only 10 Minutes Left');
        return;
      } else if (count == -1) {
        clearInterval(downloadTimer);
        this.submitExamToDB();
        return;
      }

      var seconds = count % 60;
      var minutes = Math.floor(count / 60);
      var hours = Math.floor(minutes / 60);
      minutes %= 60;
      hours %= 60;

      this.clock = hours + ":" + minutes + ":" + seconds;

    }, 1000);
    this.notificationService.success(': : Timer Start');

  }

  /**Method call on submit the test */
  submitTest() {
    this.openConfirmDialog('Are you sure to submit quiz ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.submitExamToDB();
        }
      });
  }

  submitExamToDB() {
    this.rightAnswer = 0;
    this.totalAnswered = 0;
    for (let i = 0; i < this.allQuestions.length; i++) {
      if ("selected" in this.allQuestions[i] && (this.allQuestions[i]["selected"] != null)) {
        this.totalAnswered++; // how many ques visited
        if (this.allQuestions[i]["selected"] == this.allQuestions[i]["answer"]) {
          this.rightAnswer++; // correct answer
        }
      }
    }

    this.totalPercent = Math.floor(this.rightAnswer / this.allQuestions.length * 100);
    if (this.totalPercent > 80) {
      this.grade = 'A+';
    }
    else if (this.totalPercent <= 80 && this.totalPercent > 75) {
      this.grade = 'A';
    }
    else if (this.totalPercent <= 75 && this.totalPercent > 65) {
      this.grade = 'B+';
    }
    else if (this.totalPercent <= 65 && this.totalPercent >= 60) {
      this.grade = 'B';
    }
    else {
      this.grade = 'C';
    }

    let stdResult = {
      studentId: atob(sessionStorage.getItem('tokenId')),
      examId: atob(sessionStorage.getItem('examCode')),
      totalMarks: this.allQuestions.length,
      obtainedMarks: this.rightAnswer,
      grade: this.grade,
      status: this.totalPercent > 40 ? "pass" : "fail"
    }
    // console.log(this.totalPercent, this.grade);
    this.quizService.insertResult(stdResult).subscribe(
      () => {
        this.notificationService.success(':: Result Submitted Successfully');
        this.isResult = true;
        this.isQuiz = false;
      }
    )
  }

  showAnswer() {
    this.isCheckAns = true;
    this.isResult = false;
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

  onLogout() {
    this.openConfirmDialog('Are you sure to logout ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.quizService.voucherCode.reset();
          this.quizService.selectExam.reset();
          this.notificationService.logout();
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    this.quizService.voucherCode.reset();
    this.quizService.selectExam.reset();
  }

}
