import { Appoinmentmodel } from './appoinmentmodel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Labtechnician } from './labtechnician';

@Injectable({
  providedIn: 'root',
})
export class LabtechnicianService {
  //create an instance
  labTechnician: Labtechnician = new Labtechnician();
  appointments: Appoinmentmodel[];

  constructor(private httpClient: HttpClient) {}

  getLabTechnicianData(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/employee/GetEmployeeById?id=' + id)
      .toPromise()
      .then((response) => (this.labTechnician = response as Labtechnician));
    console.log(this.labTechnician);
    console.log(this.labTechnician.EmployeeId);
  }

  //get all appointments for lab technician

  getAllPatientsOfLabTechnician(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/appointment/GetByDoctor?id=' + id)
      .toPromise()
      .then((response) => (this.appointments = response as Appoinmentmodel[]));
    console.log(this.appointments);
  }

  //delete a appointment for lab technician
  deleteAppointment(id: number) {
    return this.httpClient.delete(
      environment.apiUrl + '/api/appointment/delete?id=' + id
    );
  }

  //getAllPatientsFor All doctors
  getAllPaetients(date: Date) {
    this.httpClient
      .get(environment.apiUrl + '/api/appointment/' + date)
      .toPromise()
      .then((response) => (this.appointments = response as Appoinmentmodel[]));
  }
}
