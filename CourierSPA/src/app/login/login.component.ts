import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ModalService } from '../services/Dialog/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  model: any = {};
  constructor(private authService: AuthService,  private router: Router, private modalService: ModalService) { }

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
      this.router.navigate(['/admin/admin-dashboard']);
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
  openInfoModal() {
    this.modalService.openInfoModal('Hello Info');
  }

  openWarningModal() {
    this.modalService.openWarningModal('Hello Warning');
  }

  openErrorModal() {
    this.modalService.openErrorModal('Hello Error');
  }

  openConfirmModal() {
    this.modalService.openConfirmModal('Are you love me?', (answer: boolean) => {
      if (answer) {
        console.log('Yes, I love you.');
        return;
      }
      console.log('No, I\'m sorry.');
    });
  }
}
