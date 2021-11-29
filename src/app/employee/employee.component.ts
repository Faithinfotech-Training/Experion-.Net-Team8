import { Employee } from './../shared/employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  empId: number;
  employee: Employee = new Employee();
  constructor(
    public empService: EmployeeService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.empService.getAllDepartments();
    this.empService.getAllRoles();
  }

  //onSubmit function
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.empService.formData.EmployeeId;
    //insert
    if (addId == 0 || addId == null) {
      this.insertEmployee(form);
    } else {
      console.log('updating record');
      this.updateEmployee(form);
    }
  }

  //clear all contents and Initialization
  resetForm(from?: NgForm) {
    if (from != null) {
      from.resetForm();
    }
  }

  //Insert
  insertEmployee(form?: NgForm) {
    console.log('Iserting a record...');
    this.empService.insertEmployee(form.value).subscribe((data) => {
      console.log(data);
      this.resetForm(form);
      this.toastr.success('Employee added', 'EmpApp v2021');
    });
  }

  //Update
  updateEmployee(form?: NgForm) {
    console.log('updating a record...');
    this.empService.updateEmployee(form.value).subscribe((data) => {
      console.log(data);
      this.resetForm(form);
      this.toastr.success('Employee updated', 'EmpApp v2021');
    });
  }
}
