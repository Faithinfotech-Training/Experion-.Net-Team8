import { Test } from './../shared/test';
import { PrescriptionService } from './../shared/prescription.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AppointmentService } from '../shared/appointment.service';

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
  form: FormGroup;
  tests: string;
  data: any;
  checkArray: FormArray;
  Tests = [new Test(1, 'RTPCR'), new Test(2, 'HB'), new Test(3, 'Creatine')];
  selectedTests: Test[];
  constructor(
    public preService: PrescriptionService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public appService: AppointmentService
  ) {}

  ngOnInit(): void {
    console.log(this.Tests);
    //get empId from activated route
    this.empId = this.route.snapshot.params['empId'];
    this.patientId = this.route.snapshot.params['patientId'];
    this.atId = this.route.snapshot.params['atId'];
    console.log(this.empId);
    console.log(this.patientId);
    //this.empId = 2;
    //this.patientId = 2;
  }

  onCheckboxChange(e) {
    this.checkArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
      console.log(this.checkArray);
    } else {
      let i: number = 0;

      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);

          return;
        }

        i++;
      });
    }
  }

  //onSubmit function
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.selectedTests = form.controls['selectedTests'].value;
    console.log(this.selectedTests);
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

  updateStatus(id: number) {
    this.appService.UpdateStatus(id).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Appointment Status Updated', 'CMSApp v2021');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Insert
  insertPrescription(form?: NgForm) {
    console.log('Inserting a record...');
    form.value.PatientId = this.patientId;
    form.value.EmployeeId = this.empId;
    var datePipe = new DatePipe('en-UK');
    let formatDate: any = datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    form.value.PrescriptionDate = formatDate;
    console.log(form.value);
    if (confirm('Do you want to add lab tests?')) {
      this.data = { name: this.checkArray };
      console.log(this.data);
      this.tests = JSON.stringify(this.data);
      console.log(this.tests);
      //this.router.navigate(['labtest', this.patientId, this.empId]);
    } else {
      form.value.Tests = null;
      this.preService.AddPrescription(form.value).subscribe((data) => {
        console.log(data);
        this.toastr.success('Prescription added', 'CMSApp v2021');
      });
      this.updateStatus(this.patientId);
      this.router.navigate(['doctor', this.empId]);
    }
  }
}
