import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubmenu1 = false;
  showSubmenu2 = false;
  showSubmenu3 = false;
  showSubmenu4 = false;
  showSubmenu5 = false;


  constructor() { }

  ngOnInit() {
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
