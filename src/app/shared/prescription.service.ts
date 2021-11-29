import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prescription } from './prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  //create instance of Prescription
  prescriptions: Prescription[];

  constructor(private httpClient: HttpClient) { }

  //get prescription details 
  GetPrescriptionDetails(){
    this.httpClient.get(environment.apiUrl + '/api/prescriptions')
    .toPromise()
    .then((response) => (this.prescriptions = response as Prescription[]))
  }

  //Add prescription
  AddPrescription(prescription:Prescription):Observable<any> {
    return this.httpClient.post(
      environment.apiUrl + '/api/prescription', prescription
    );
  }

  //Update Prescription
  UpdatePrescription(prescription:Prescription):Observable<any> {
    return this.httpClient.put(environment.apiUrl + '/api/prescription',
    prescription);
  }

  //Get all prescription by patient by id
  GetPrescriptionByPatientId(patientId:number):Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/api/prescription/' + patientId);
  }

  //Get all prescription of patient by date
  GetPrescriptionByDate(patientDate:Date):Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/api/prescription/' + patientDate);
  }

  //Get all prescription of patient by date
  GetPrescriptionForPeriod(patientDate:Date):Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/api/prescription/Upto/' + patientDate);
  }
}
