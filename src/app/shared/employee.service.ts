import { Department } from './department';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  //create an instance of Employee
  formData: Employee = new Employee();
  departments: Department[];
  employees: Employee[];

  constructor(private httpClient: HttpClient) {}

  //GET department for binding
  getAllDepartments() {
    this.httpClient
      .get(environment.apiUrl + '/api/department/getalldepartments')
      .toPromise()
      .then((response) => (this.departments = response as Department[]));
  }

  //insert employee
  insertEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/employee', employee);
  }

  //update employee
  updateEmployee(employee: Employee): Observable<any> {
    return this.httpClient.put(environment.apiUrl + '/api/employee', employee);
  }

  //get all employees
  getAllEmployee() {
    this.httpClient
      .get(environment.apiUrl + '/api/employee')
      .toPromise()
      .then((response) => (this.employees = response as Employee[]));
  }

  //delete employee
  deleteEmployee(id: number) {
    return this.httpClient.delete(environment.apiUrl + '/api/employee/' + id);
  }

  //get a particular employee from
  getEmployee(empId: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/api/employee/' + empId);
  }
}
