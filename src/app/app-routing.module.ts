import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { AuthGuard } from './shared/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: '1' },
  },
  { path: 'payment', component: PaymentComponent },
  { path: 'paymentlist', component: PaymentlistComponent },
  { path: 'payment/:paymentId', component: PaymentComponent },
  { path: 'employee', component: EmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
