import { DoctorService } from './../shared/doctor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  empId: number;
  page: number = 1;
  filter: string;
  constructor(
    private route: ActivatedRoute,
    public doctorService: DoctorService,
    public toastrservice :ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['empId'];

    this.doctorService.GetAllPatientsOfDoctor(this.empId);
  }

  AddPrescription(id: number) {
    console.log(id, this.empId);
    this.router.navigate(['prescription', id, this.empId]);
  }

  DeleteAppointment(id: number) {
    console.log('cancel the appointment');

    if(confirm('Are you sure you want to cancel or you had completed this appointment ? ')){
      this.doctorService.deleteappointment(id).subscribe(result =>{
        console.log(result);
        this.doctorService.GetAllPatientsOfDoctor(this.empId);
        this.toastrservice.success("Appointment record has been deleted", "ClinicApp v2021");
        
      },
      (error)=>{
        console.log(error);
      }
      );
    }
  }
}
