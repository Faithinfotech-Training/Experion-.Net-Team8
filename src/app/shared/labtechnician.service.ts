import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Labtechnician } from './labtechnician';

@Injectable({
  providedIn: 'root'
})
export class LabtechnicianService {

  //create an instance
  labTechnician:Labtechnician = new Labtechnician();

  constructor(private httpClient: HttpClient) { }

  getLabTechnicianData(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/employee/GetEmployeeById?id=' + id)
      .toPromise()
      .then((response) => (this.labTechnician = response as Labtechnician));
    console.log(this.labTechnician);
    console.log(this.labTechnician.EmployeeId);

  }

  
}
