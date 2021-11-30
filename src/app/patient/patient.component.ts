import { PatientService } from './../shared/patient.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor(public patientService: PatientService, private toastrService: ToastrService,
    public router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    let addId = this.patientService.formData.PatientId;

    if (addId == 0 || addId == null) {
      //Insert
      this.InsertPatientRecord(form);
     
    } else {
      //Update
      console.log('Updating record...');
      this.UpdatePatientRecord(form);
    }
  }

  //Clear all content at Initialization
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

  //Insert
  InsertPatientRecord(form?: NgForm) {
    console.log('Inserting a record...');
    this.patientService.InsertPatient(form.value).subscribe((result) => {
      console.log(result);
      this.resetForm(form);
      this.toastrService.success('Patient record has been inserted','ClinicApp v2021')
      
      this.router.navigate(['appointments', result])
    });
    //window.location.reload();
  }

  //Update
  UpdatePatientRecord(form?: NgForm) {
    console.log('Updating a record...');
    this.patientService.UpdatePatient(form.value).subscribe((result) => {
      console.log(result);
      this.resetForm(form);
      this.toastrService.success('Patient record has been updated','ClinicApp v2021')
      this.patientService.GetAllPatients();
    });
    //window.location.reload();
  }

}
