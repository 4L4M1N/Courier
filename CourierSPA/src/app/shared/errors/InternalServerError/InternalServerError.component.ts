import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-InternalServerError',
  templateUrl: './InternalServerError.component.html',
  styleUrls: ['./InternalServerError.component.css']
})
export class InternalServerErrorComponent implements OnInit {
  message:any;
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params=> {
      this.message = params;
    })
  }

  ngOnInit() {
  }

}
