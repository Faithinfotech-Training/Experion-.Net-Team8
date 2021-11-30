import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  constructor(public appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  GetAllDoctors(id: number){
    this.appointmentService.GetAllDoctors(id);
  }



}
