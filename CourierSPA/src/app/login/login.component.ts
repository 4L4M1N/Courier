import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, ElementRef } from '@angular/core';
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
  @ViewChild("errorlogin", {read: ElementRef, static:false}) errorlogin: ElementRef;
  loginForm: FormGroup;
  submitted = false;
  errormessage:string;
  hide:any;
  model: any = {};
  _ref:any; 
  constructor(private authService: AuthService,  private router: Router, private modalService: ModalService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  get f() { return this.loginForm.controls; }

  login() {
    this.hide = false;
    this.errormessage = '';
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
      this.errormessage = error;
      // this.modalService.openErrorModal(error);
    });
  }

  loggedin() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('log out');
  }
  CloseError() {
    //console.log(this.errorlogin.nativeElement);
    //this.errorlogin.nativeElement.hidden = true;
    this.hide = true;
    this.errormessage = '';
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
