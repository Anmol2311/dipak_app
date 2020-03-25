import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { Router, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {

  loading = false;
  currentYear: number;
  constructor(private userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    private titleService: Title) {
    this.titleService.setTitle('Hematite Infotech - User');
    this.currentYear = new Date().getFullYear();
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

  }
  title = 'MaterialApp';
  myStyle: object = {};
  mySidebar: object = {}
  isOpen: boolean = false;
  userObj: any;

  ngOnInit() {
    this.myStyle = {
      "margin-left": "0",
      "transition": "all .5s ease-in-out"
    }
    this.mySidebar = {
      "visibility": "hidden",
      "transform": "translate3d(-100%,0,0)",
      "width": "200px",
      "transition": "all .5s ease-in-out"
    }
    let userId = Number(atob(sessionStorage.getItem('adminTokenId')));
    this.getUser(userId);
  }

  getUser(id: number) {
    // console.log(id);
    this.userService.getSingleUser(id).subscribe(user => {
      this.userObj = user[0];
      // console.log(this.userObj);
    });
  }

  // get student name
  getUserName() {
    return this.userObj ? this.userObj.firstName + " " + this.userObj.lastName : '';
  }

  snavToggle() {
    this.isOpen = !this.isOpen;
    this.myStyle = {
      "margin-left": this.isOpen ? "200px" : "0",
      "transition": "all .5s ease-in-out"
    }
    this.mySidebar = {
      "visibility": this.isOpen ? "visible" : "hidden",
      "transform": this.isOpen ? "none" : "translate3d(-100%,0,0)",
      "width": "200px",
      "transition": "all .5s ease-in-out"
    }
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
          this.notificationService.logout();
          this.router.navigate(['/']);
        }
      });
  }

}
