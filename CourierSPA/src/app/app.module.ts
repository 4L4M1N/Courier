import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { MerchantInfoComponent } from './admin/merchant-info/merchant-info.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MerchantAgreementComponent } from './admin/merchant-agreement/merchant-agreement.component';
import { MerchantEditComponent } from './admin/merchant-edit/merchant-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      HomeComponent,
      AdminComponent,
      AdminDashboardComponent,
      AdminNavComponent,
      MerchantInfoComponent,
      MerchantAgreementComponent,
      MerchantEditComponent,
      LoginComponent,
      RegistrationComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      provide
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
