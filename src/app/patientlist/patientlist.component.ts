import { AppointmentService } from './../shared/appointment.service';
import { PatientService } from './../shared/patient.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../shared/patient';
import { DoctorService } from '../shared/doctor.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.scss']
})
export class PatientlistComponent implements OnInit {
  empId: number;
  page: number = 1;
  filter: string;
  
  constructor(
    public appointmentService: AppointmentService,
    public doctorService: DoctorService,
    public toastrservice :ToastrService
  ) {}

  ngOnInit(): void {
    this.appointmentService.GetAllAppoinments();
  }


  DeleteAppointment(id: number) {
    console.log('cancel the appointment');

    if(confirm('Are you sure you want to cancel or you had completed this appointment ? ')){
      this.doctorService.deleteappointment(id).subscribe(result =>{
        console.log(result);
        this.toastrservice.success("Appointment record has been deleted", "ClinicApp v2021");
        
      },
      (error)=>{
        console.log(error);
      }
      );
    }
  }
  }


