import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  merchants: any;
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getMerchants();
  }
  getMerchants() {
    this.http.get('http://localhost:5000/api/auth/test', {responseType: 'text'}).subscribe(response => {
      this.merchants = response;
      console.log(this.merchants);
    }, error => {
      console.log(error);
    });
  }
}
