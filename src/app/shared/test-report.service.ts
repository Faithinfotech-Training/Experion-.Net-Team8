import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestReport } from './test-report';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Testreportmodel } from './testreportmodel';

@Injectable({
  providedIn: 'root'
})
export class TestReportService {

  constructor(private httpClient: HttpClient) {
    
   }

  // create an instance of TestReport
  testReports: Testreportmodel[];
  newTestReport : TestReport = new TestReport();


// get reports of employee by id 
  getTestReportsByEmployeeId(id:number){

  }

  insertTestReport(testReport :TestReport): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/testreport/',
    testReport
    );
  }

  // get test report by id
  getTestReport(id:number){
    return this.httpClient.get(environment.apiUrl + '/api/testreport/'+id);
  }

  //delete test report
  deleteTestReport(id: number) {
    return this.httpClient.delete(environment.apiUrl + '/api/testreport/' + id);
  }

}
