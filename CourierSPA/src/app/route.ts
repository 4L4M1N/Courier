import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MerchantInfoComponent } from './admin/merchant-info/merchant-info.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MerchantAgreementComponent } from './admin/merchant-agreement/merchant-agreement.component';
import { MerchantEditComponent } from './admin/merchant-edit/merchant-edit.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        children: [
            { path: 'admin', component: AdminComponent, children: [
                { path: 'merchant-info', component: MerchantInfoComponent},
                { path: 'admin-dashboard', component: AdminDashboardComponent},
                { path: 'merchant-agreement', component: MerchantAgreementComponent},
                {path: 'merchant-agreement/edit', component: MerchantEditComponent}
            ]
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'notes', pathMatch: 'full'},
];
