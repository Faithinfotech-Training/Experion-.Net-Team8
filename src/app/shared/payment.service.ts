import { Patient } from './patient';
import { Payment } from './payment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  insertEmployee(value: any) {
    throw new Error('Method not implemented.');
  }
  updateEmployee(value: any) {
    throw new Error('Method not implemented.');
  }
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
  insertPayment(payment: Payment):Observable<any> {
    return this.httpClient.post(environment.apiUrl+"/api/payment",payment);


  }
  updatePayment(payment: Payment):Observable<any> {
    return this.httpClient.put(environment.apiUrl+"/api/payment",payment);
    

  }
  //get all employee
  bindListPayments(){
    this.httpClient.get(environment.apiUrl+"/api/payment")
    .toPromise().then(response => 
    this.payments= response as Payment[]);
  }
  //particular employee from

  getPaymentPatientId(patientId: number): Observable<any> {

    return this.httpClient.get(

      environment.apiUrl + '/api/payment/' + patientId

    );

  }
}
