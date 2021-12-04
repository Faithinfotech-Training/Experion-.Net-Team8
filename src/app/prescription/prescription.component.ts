import { PrescriptionService } from './../shared/prescription.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm,FormBuilder } from '@angular/forms';
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
  data: any;
  addLabTests:boolean = false;

  CountryData: Array<any> = [
    { name: 1, value: 'ECG' },
    { name: 2, value: 'MRI' },
    { name: 3, value: 'X-Ray' },
    { name: 4, value: 'BP' },
    { name: 5, value: 'Urine' }
  ];  

  
  constructor(
    public preService: PrescriptionService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public appService: AppointmentService,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
  
    //get empId from activated route
    this.empId = this.route.snapshot.params['empId'];
    this.patientId = this.route.snapshot.params['patientId'];
    this.atId = this.route.snapshot.params['atId'];
    console.log(this.empId);
    console.log(this.patientId);
    this.addLabTests = false;
    //this.patientId = 2;
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onAddLabTests(e) {
  
    if (e.target.checked) {
      this.addLabTests = true;
    } else {
      this.addLabTests = false;
    }
  }

  //onSubmit function
  onSubmit(form: NgForm) {
    console.log(form.value);

    let addId = this.preService.prescriptionForm.PrescriptionId;
    let jsonString : String = '';

    if(this.addLabTests){
      const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    let tests = [];
    checkArray.controls.forEach((item: FormControl) => {

      tests.push(item.value);
    });

    let josnData : any = {
      "tests": tests
    }

    jsonString= JSON.stringify(josnData);
    form.value.Tests = jsonString;
    }

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
    if(!this.addLabTests){
      if (confirm('Do you want to add lab tests?')) {

      }else{
    
        this.preService.AddPrescription(form.value).subscribe((data) => {
          console.log(data);
          this.toastr.success('Prescription added', 'CMSApp v2021');
        });
        this.updateStatus(this.patientId);
        this.router.navigate(['doctor', this.empId]);
      } 
    }else{
      this.preService.AddPrescription(form.value).subscribe((data) => {
        console.log(data);
        this.toastr.success('Prescription added', 'CMSApp v2021');
      });
      this.updateStatus(this.patientId);
      this.router.navigate(['doctor', this.empId]);
    }

  }
}
