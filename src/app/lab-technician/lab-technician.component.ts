import { LabtechnicianService } from './../shared/labtechnician.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lab-technician',
  templateUrl: './lab-technician.component.html',
  styleUrls: ['./lab-technician.component.scss']
})
export class LabTechnicianComponent implements OnInit {
  empId: number;
  page: number = 1;
  filter: string;

  constructor(
    private route: ActivatedRoute,
    public labTechnicianService: LabtechnicianService,
    public toastrservice :ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.empId = this.route.snapshot.params['empId'];
    this.labTechnicianService.GetAllPatientsOfLabTechnician(this.empId);
  }

  AddLabReport(id: number) {
    console.log(id, this.empId);
    this.router.navigate(['test-report', id, this.empId]);
  }

  DeleteAppointment(id: number) {
    console.log('cancel the appointment');

    if(confirm('Are you sure you want to proceed?')){
      this.labTechnicianService.deleteAppointment(id).subscribe(result =>{
        console.log(result);
        this.labTechnicianService.GetAllPatientsOfLabTechnician(this.empId);
        this.toastrservice.success("Appointment record has been deleted", "ClinicApp v2021");
        
      },
      (error)=>{
        console.log(error);
      }
      );
    }
  }
}
