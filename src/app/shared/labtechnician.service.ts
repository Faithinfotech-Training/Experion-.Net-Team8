import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Labtechnician } from './labtechnician';

@Injectable({
  providedIn: 'root'
})
export class LabtechnicianService {

  //create an instance
  patients:Labtechnician[];
  constructor(private httpClient: HttpClient) { }

  GetAllPatientsOfLabTechnician(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/appointment/GetByDoctor?id=' + id)
      .toPromise()
      .then((response) => (this.patients = response as Labtechnician[]));
    console.log(this.patients);
  }

  //delete an appointment 
  deleteAppointment(id: number) {
    return this.httpClient.delete(
      environment.apiUrl + '/api/appointment/' + id
    );
  }
  
}
