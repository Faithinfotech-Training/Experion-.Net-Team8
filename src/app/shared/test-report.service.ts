import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestReport } from './test-report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestReportService {

  constructor(private httpClient: HttpClient) {
    
   }

  // create an instance of TestReport
  testReports: TestReport[];
  newTestReport : TestReport = new TestReport();
  
  getTestReportsByEmployeeId(id:number){

  }

  addTestReport(){
    return this.httpClient.post(environment.apiUrl + '/api/appointment/' + id)
  }

}
