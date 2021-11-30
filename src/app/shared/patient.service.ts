import { Injectable } from '@angular/core';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //create an instance
  formData: Patient = new Patient();
  constructor() { }
}
