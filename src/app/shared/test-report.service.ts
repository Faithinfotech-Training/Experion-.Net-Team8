import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestReport } from './test-report';

@Injectable({
  providedIn: 'root'
})
export class TestReportService {

  constructor(private httpClient: HttpClient) { }

  // create an instance of TestReport
  formData: TestReport = new TestReport();

}
