import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  patientid: number;
  constructor(
    public appointmentService: AppointmentService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientid = this.route.snapshot.params['patientid'];
    //this.appointmentService.GetAllPatients();
  }

  GetAllDoctors(id: number) {
    this.appointmentService.GetAllDoctors(id);
  }

  //onSubmit function
  onSubmit(form: NgForm) {
    console.log(form.value);
    form.value.PatientId = this.patientid;
    let addId = this.appointmentService.formData.AppointmentId;
    //insert
    if (addId == 0 || addId == null) {
      this.insertAppointment(form);
    } else {
      console.log('updating record');
      this.updateAppointment(form);
    }
  }

  //clear all contents and Initialization
  resetForm(from?: NgForm) {
    if (from != null) {
      from.resetForm();
    }
  }

  //Insert
  insertAppointment(form?: NgForm) {
    console.log('Inserting a record...hii');
    this.appointmentService.InsertAppoinment(form.value).subscribe((data) => {
      console.log(data);
      this.resetForm(form);
      this.toastr.success('Appointment added', 'ClinicApp v2021');
      this.router.navigateByUrl('/patientlist');
    });
  }

  //Update
  updateAppointment(form?: NgForm) {
    console.log('updating a record...');
    this.appointmentService.UpdateAppointment(form.value).subscribe((data) => {
      console.log(data);
      this.resetForm(form);
      this.toastr.success('Appointment updated', 'ClinicApp v2021');
    });
  }
}
