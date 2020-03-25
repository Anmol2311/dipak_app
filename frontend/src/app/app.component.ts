import { Component, OnInit } from '@angular/core';
// import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'MaterialApp';
  myStyle: object = {};
  mySidebar: object = {}
  isOpen: boolean = false;

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
}
