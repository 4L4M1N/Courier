import { ConfirmComponent } from './shared/Dialog/confirm/confirm.component';
import { AlertComponent } from './shared/Dialog/alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
         MatIconModule, MatListModule, MatCardModule, MatGridList, MatGridListModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatCheckboxModule } from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './_layout/admin-nav/admin-nav.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';
import { DeliveryManAddComponent } from './admin/deliveryManAdd/deliveryManAdd.component';
import { DeliveryAddressService } from './services/deliveryAddress.service';
import { ItemcreationService } from './services/itemcreation.service';



@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      HomeComponent,
      AdminDashboardComponent,
      AdminNavComponent,
      MerchantInfoComponent,
      MerchantAgreementComponent,
      MerchantEditComponent,
      LoginComponent,
      RegistrationComponent,
      MerchentaddComponent,
      BookingComponent,
      ItemcreationComponent,
      AdminLayoutComponent,
      DeliveryManAddComponent,
      AlertComponent,
      ConfirmComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatCardModule,
      MatGridListModule,
      MatDialogModule,
      MatCheckboxModule
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
      AuthService,
      MerchantService,
      DeliveryManAddComponent,
      DeliveryAddressService,
      ItemcreationService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      AlertComponent, ConfirmComponent
    ],
})
export class AppModule { }
