import { AppointmentsComponent } from './appointments/appointments.component';

import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { AuthGuard } from './shared/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { PatientComponent } from './patient/patient.component';
import { SignupComponent } from './signup/signup.component';
import { PrescriptionComponent } from './prescription/prescription.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'paymentlist', component: PaymentlistComponent },
  { path: 'payment/:paymentId', component: PaymentComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'employee/:empId', component: EmployeeComponent },
  { path: 'employeelist', component: EmployeeListComponent },
  { path: 'specialization/:empId/:roleId', component: SpecializationComponent },
  { path: 'appointments/:patientid', component: AppointmentsComponent },
  { path: 'signup/:empId/:roleId', component: SignupComponent },
  { path: 'prescription', component: PrescriptionComponent },
  {
    path: 'receptionist',
    component: ReceptionistComponent,
    canActivate: [AuthGuard],
    data: { role: '4' },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: '3' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
