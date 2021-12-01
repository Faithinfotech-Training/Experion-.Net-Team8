import { PrescriptionService } from './../shared/prescription.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
})
export class PrescriptionComponent implements OnInit {
  empId: number;
  patientId: number;
  currentDate: Date = new Date();
  atId: number;
  constructor(
    public preService: PrescriptionService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //get empId from activated route
    this.empId = this.route.snapshot.params['empId'];
    this.patientId = this.route.snapshot.params['patientId'];
    this.atId = this.route.snapshot.params['atId'];
    console.log(this.empId);
    console.log(this.patientId);
    //this.empId = 2;
    //this.patientId = 2;
  }

  //onSubmit function
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.preService.prescriptionForm.PrescriptionId;
    //insert
    if (addId == 0 || addId == null) {
      this.insertPrescription(form);
    }
  }

  //clear all contents and Initialization
  resetForm(from?: NgForm) {
    if (from != null) {
      from.resetForm();
    }
  }

  //Insert
  insertPrescription(form?: NgForm) {
    console.log('Iserting a record...');
    form.value.PatientId = this.patientId;
    form.value.EmployeeId = this.empId;
    var datePipe = new DatePipe('en-UK');
    let formatDate: any = datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    form.value.PrescriptionDate = formatDate;
    console.log(form.value);
    this.preService.AddPrescription(form.value).subscribe((data) => {
      console.log(data);
      this.toastr.success('Prescription added', 'CMSApp v2021');
      this.router.navigate(['doctor', this.atId]);
    });
  }
}
