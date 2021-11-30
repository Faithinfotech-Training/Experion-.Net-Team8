import { PatientService } from './../shared/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor(public patientService: PatientService) { }

  ngOnInit(): void {
  }

}
