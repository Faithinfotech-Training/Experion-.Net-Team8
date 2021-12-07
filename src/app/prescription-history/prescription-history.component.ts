import { PrescriptionHistory } from './../shared/prescription-history';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from '../shared/prescription.service';

@Component({
  selector: 'app-prescription-history',
  templateUrl: './prescription-history.component.html',
  styleUrls: ['./prescription-history.component.scss']
})
export class PrescriptionHistoryComponent implements OnInit {

  prescriptionList : PrescriptionHistory[];
  patientId: number;
  constructor(private  router: Router, private route: ActivatedRoute, public prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['patientId'];
    this.prescriptionService.GetAllPrescription(this.patientId).subscribe((data)=>{
      this.prescriptionList = data;
      console.log(this.prescriptionList);
    })
    

  }

}
