import { Tests } from './../shared/tests';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LabtechnicianService } from '../shared/labtechnician.service';
import { TestReportService } from '../shared/test-report.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PrescriptionService } from '../shared/prescription.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit {
  patientId: number;
  prescribedTests: Array<string>;
  date: Date = new Date();
  tests: Tests = new Tests();
  constructor(
    private route: ActivatedRoute,
    public toastrservice: ToastrService,
    private router: Router,
    public authService: AuthService,
    public labTechnicianService: LabtechnicianService,
    public testReportService: TestReportService,
    public preService: PrescriptionService
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['patientId'];
    this.labTechnicianService.getTests(this.patientId);
    this.preService.GetPrescriptionByPatientId(this.patientId).subscribe(
      (data) => {
        console.log(data);
        this.tests = data;
        let afterJson = JSON.parse(data.Tests);
        this.prescribedTests = afterJson['tests'];
        console.log(afterJson);
        console.log(this.prescribedTests);
      },
      (error) => console.log(error)
    );
    //console.log(this.labTechnicianService.tests.Tests);

    var datePipe = new DatePipe('en-UK');
    let formatDate: any = datePipe.transform(this.date, 'yyyy-MM-dd');
    this.date = formatDate;
  }

  //onSubmit function
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.labTechnicianService.testForm.TestReportId;
    //insert
    if (addId == 0 || addId == null) {
      this.insertTestReport(form);
      this.router.navigate(['labtechnician', 2]);
    }
  }

  insertTestReport(form: NgForm) {
    form.value.ReportGeneratedDate = this.date;
    form.value.PatientId = this.patientId;
    form.value.EmployeeId = this.tests.DoctorId;
    form.value.LabTechnicianId = 2;
    this.labTechnicianService.insertTestReport(form.value);
  }
}
