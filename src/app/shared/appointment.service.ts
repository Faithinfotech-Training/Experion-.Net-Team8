import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from './appointment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  //create instance
  formData: Appointment = new Appointment();
  appointments: Appointment[];
  employees: Employee[];
  constructor(private httpClient: HttpClient) {}

  GetAllDoctors(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/employee/' + id)
      .toPromise()
      .then((response) => (this.employees = response as Employee[]));
    console.log(this.employees);
  }

  //Add appointment i.e insert appointment
  InsertAppoinment(appointment: Appointment): Observable<any> {
    return this.httpClient.post(
      environment.apiUrl + '/api/appointment',
      appointment
    );
  }

  //Update Appointment
  UpdateAppointment(appointment: Appointment): Observable<any> {
    return this.httpClient.put(
      environment.apiUrl + '/api/appointment',
      appointment
    );
  }

  //View all appointments
  GetAllAppoinments() {
    this.httpClient
      .get(environment.apiUrl + '/api/appointment')
      .toPromise()
      .then((response) => (this.appointments = response as Appointment[]));
  }

  //View all appointments by date
  GetAllAppointmentsByDate(appDate: Date): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + '/api/appointment/' + appDate
    );
  }

  //view all appointments by doctor
  GetAllAppointmentsByDoctor(empId: number): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + '/api/appointment/' + empId
    );
  }
}
