import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if(this.loginForm.invalid)
    {
      return;
    }
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    // this.model.assign(username,password);
    this.model.username = username;
    this.model.password = password;
    console.log(this.model);
    this.authService.login(this.model).subscribe( next => {
      console.log('success');
    }, error => {
      console.log('failed');
    });
  }

  loggedin() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('log out');
  }
}
