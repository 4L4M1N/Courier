import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-InternalServerError',
  templateUrl: './InternalServerError.component.html',
  styleUrls: ['./InternalServerError.component.css']
})
export class InternalServerErrorComponent implements OnInit {
  message:any;
  previousRoute:any;
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params=> {
      this.message = params;
    })
  }

  ngOnInit() {
  }

}
