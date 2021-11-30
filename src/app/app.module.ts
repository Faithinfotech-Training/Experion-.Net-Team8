import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentService } from './shared/appointment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './shared/employee.service';
import { AuthInterceptor } from './shared/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { EmployeeComponent } from './employee/employee.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PatientComponent } from './patient/patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    PaymentComponent,
    PaymentlistComponent,
    EmployeeComponent,
    EmployeeListComponent,
    AppointmentsComponent,
    PatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    ReactiveFormsModule,
  ],
  providers: [
    EmployeeService,
    AppointmentService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
