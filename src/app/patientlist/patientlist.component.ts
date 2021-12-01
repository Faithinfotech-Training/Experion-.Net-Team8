import { PatientService } from './../shared/patient.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Patient } from '../shared/patient';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.scss']
})
export class PatientlistComponent implements OnInit {
  page: number = 1;
  filter: string;
  constructor(  public patientService:PatientService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.patientService.GetAllPatients(); 
  }
  reloadSearch() { 
      window.location.reload(); 
   }
  populateForm(patient:Patient) {
    console.log(patient);
    this.patientService.formData = Object.assign({}, patient);
  }
  //update
  updatePatient(patientId: number) {
    console.log(patientId);
    this.router.navigate(['patient', patientId]);
  }

}
