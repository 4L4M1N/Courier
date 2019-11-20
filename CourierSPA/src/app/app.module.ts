import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';

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
import { MerchantService } from './services/Merchant.service';
import { MerchentaddComponent } from './admin/merchentadd/merchentadd.component';
import { BookingComponent } from './admin/booking/booking.component';
import { ItemcreationComponent } from './admin/itemcreation/itemcreation.component';
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
      RegistrationComponent,
      MerchentaddComponent,
      BookingComponent,
      ItemcreationComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
      AuthService,
      MerchantService,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
