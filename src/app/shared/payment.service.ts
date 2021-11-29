import { Patient } from './patient';
import { Payment } from './payment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  formData:Payment=new Payment();
  patient:Patient[];
 payments: Payment[];
  constructor(private httpClient:HttpClient) { }
  //get patients for binding
  BindCmbPatients() {
    this.httpClient
      .get(environment.apiUrl + '/api/patient')
      .toPromise()
      .then((response) => (this.patient = response as Patient[]));
  }
  //insert a employee
  insertEmployee(employee: Employee):Observable<any> {
    return this.httpClient.post(environment.apiUrl+"/api/emp/addemployee",employee);


  }
  updateEmployee(employee: Employee):Observable<any> {
    return this.httpClient.put(environment.apiUrl+"/api/emp/updateemployee",employee);
    

  }
  //get all employee
  bindListEmployees(){
    this.httpClient.get(environment.apiUrl+"/api/emp/getallemployee")
    .toPromise().then(response => 
    this.employees= response as Employee[]);
  }
  //particular employee from

  getEmployee(empId: number): Observable<any> {

    return this.httpClient.get(

      environment.apiUrl + '/api/emp/getemployeebyid?id=' + empId

    );

  }
}
