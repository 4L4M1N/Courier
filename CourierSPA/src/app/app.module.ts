import { BookingreportComponent } from './admin/bookingreport/bookingreport.component';
import { DivisionzonecreationComponent } from './admin/divisionzonecreation/divisionzonecreation.component';
import { ConfirmComponent } from './shared/Dialog/confirm/confirm.component';
import { AlertComponent } from './shared/Dialog/alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
         MatIconModule, MatListModule, MatCardModule, MatGridList,
         MatGridListModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef,
         MatCheckboxModule, MatTableModule, MatFormFieldModule, MatChipsModule,
         MatInputModule, MatPaginator, MatSortModule, MatPaginatorModule, MatSelectModule,
         MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
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
import { ManageBookingComponent } from './admin/manage-booking/manage-booking.component';
import { AssignDelivManComponent } from './admin/assignDelivMan/assignDelivMan.component';
import { MerchantItemComponent } from './admin/merchant-item/merchant-item.component';
import { RequestBookingComponent } from './request-booking/request-booking.component';
import { ManageRequestedBookingComponent } from './admin/manage-requested-booking/manage-requested-booking.component';
import { StatusService } from './services/status.service';
import { SetStatusComponent } from './admin/setStatus/setStatus.component';
import { BookingReportService } from './services/Report/booking/bookingReport.service';
import { ErrorInterceptorProvider } from './interceptors/ErrorInterceptor';
import { LoaderInterceptor } from './interceptors/LoaderInterceptor';
import { LoaderComponent } from './shared/loader/loader/loader.component';
import { PreviousRouteService } from './services/Others/PreviousRoute.service';
import { InternalServerErrorComponent } from './shared/errors/InternalServerError/InternalServerError.component';
import { ErrorHandleService } from './services/Others/ErrorHandle.service';





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
      MerchantItemComponent,
      LoginComponent,
      LoaderComponent,
      RegistrationComponent,
      MerchentaddComponent,
      BookingComponent,
      ItemcreationComponent,
      AdminLayoutComponent,
      DeliveryManAddComponent,
      ManageBookingComponent,
      AlertComponent,
      ConfirmComponent,
      AssignDelivManComponent,
      SetStatusComponent,
      DivisionzonecreationComponent,
      RequestBookingComponent,
      ManageRequestedBookingComponent,
      BookingreportComponent,
      InternalServerErrorComponent
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
      MatDatepickerModule,
      MatNativeDateModule,
      MatCardModule,
      MatGridListModule,
      MatDialogModule,
      MatCheckboxModule,
      MatTableModule,
      MatFormFieldModule,
      MatChipsModule,
      MatInputModule,
      MatPaginatorModule,
      MatSortModule,
      MatSelectModule
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
      {provide: LocationStrategy, useClass: HashLocationStrategy},
      {
         provide: HTTP_INTERCEPTORS,
         useClass: LoaderInterceptor,
         multi: true
       },
      AuthService,
      MerchantService,
      DeliveryManAddComponent,
      DeliveryAddressService,
      ItemcreationService,
      StatusService,
      BookingReportService,
      PreviousRouteService,
      DatePipe,
      ErrorHandleService,
      // ErrorInterceptorProvider,
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      AlertComponent, ConfirmComponent, AssignDelivManComponent, SetStatusComponent
    ],
})
export class AppModule { }
