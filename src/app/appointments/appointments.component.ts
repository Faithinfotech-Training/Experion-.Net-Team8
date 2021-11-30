import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  constructor(
    public appointmentService: AppointmentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  GetAllDoctors(id: number) {
    this.appointmentService.GetAllDoctors(id);
  }

  //onSubmit function
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.appointmentService.formData.EmployeeId;
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
    console.log('Iserting a record...');
    this.appointmentService.InsertAppoinment(form.value).subscribe((data) => {
      console.log(data);
      this.resetForm(form);
      this.toastr.success('Appointment added', 'ClinicApp v2021');
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
