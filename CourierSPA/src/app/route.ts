import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MerchantInfoComponent } from './admin/merchant-info/merchant-info.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MerchantAgreementComponent } from './admin/merchant-agreement/merchant-agreement.component';
import { MerchantEditComponent } from './admin/merchant-edit/merchant-edit.component';
import { LoginComponent } from './login/login.component';
import { MerchentaddComponent } from './admin/merchentadd/merchentadd.component';
import { BookingComponent } from './admin/booking/booking.component';
import { ItemcreationComponent } from './admin/itemcreation/itemcreation.component';
import { AdminLayoutComponent } from './_layout/admin-layout/admin-layout.component';
import { DeliveryManAddComponent } from './admin/deliveryManAdd/deliveryManAdd.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '', component: AdminLayoutComponent,
        children: [
            { path: 'admin', children: [
                { path: 'merchant-info/:merchantId', component: MerchantInfoComponent},
                { path: 'admin-dashboard', component: AdminDashboardComponent},
                { path: 'merchantadd', component: MerchentaddComponent },
                { path: 'deliverymanadd', component: DeliveryManAddComponent},
                { path: 'booking/:merchantId', component: BookingComponent},
                { path: 'itemcreate', component: ItemcreationComponent},
                { path: 'merchant-agreement', component: MerchantAgreementComponent},
                {path: 'merchant-agreement/edit', component: MerchantEditComponent}
            ]
            }
        ],
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'notes', pathMatch: 'full'},
    { path: 'admin', redirectTo: 'admin-dashboard', pathMatch: 'full'},
];
