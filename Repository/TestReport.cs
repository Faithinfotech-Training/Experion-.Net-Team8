using Clinic_Management_System_8.Models;
using Clinic_Management_System_8.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Repository
{
    public class TestReport : ITestReport
    {
        CMSContext _db;

        public TestReport(CMSContext db)
        {
            _db = db;
        }
        //--Add 
        public async Task<int> AddTestReport(TestReports test)
        {
            if (_db != null)
            {
                await _db.AddAsync(test);
                await _db.SaveChangesAsync();
                return test.TestReportId;
            }
            return 0;
        }

        public async Task DeleteTestReport(int id)
        {
            //--- locating Testreport by id ---//
            var test = _db.TestReports.FirstOrDefault(e => e.TestReportId == id);
            if (test != null)
            {
                _db.TestReports.Remove(test);
                await _db.SaveChangesAsync();


            }
        }
            public async Task<List<LabReportModel>> GetTestReport()
            {
            if (_db != null)
            {
                //LINQ
                return await (from t in _db.TestReports
                              from d in _db.Employees
                              from l in _db.Employees
                              from p in _db.Patients
                              where t.DoctorId == d.EmployeeId && t.LabTechnicianId == l.EmployeeId && t.PatientId == p.PatientId
                              select new LabReportModel
                              {
                                  TestReportId = t.TestReportId,
                                  TestReport = t.TestReport,
                                  PatientName = p.PatientName,
                                  DoctorName = d.EmployeeName,
                                  LabTechnicianName = l.EmployeeName,
                                  ReportGeneratedDate = t.ReportGeneratedDate
                              }).ToListAsync();
            }
            return null;
        }

        public  async Task<LabReportModel> GetTestReportByDate(DateTime date)
        {
            if (_db != null)
            {
                //LINQ
                return await (from t in _db.TestReports
                              from e in _db.Employees
                              from p in _db.Patients
                              where t.DoctorId == e.EmployeeId && t.LabTechnicianId == e.EmployeeId && t.PatientId == p.PatientId && t.ReportGeneratedDate==date
                              select new LabReportModel
                              {
                                  TestReportId = t.TestReportId,
                                  TestReport = t.TestReport,
                                  PatientName = p.PatientName,
                                  DoctorName = e.EmployeeName,
                                  LabTechnicianName = e.EmployeeName,
                                  ReportGeneratedDate = t.ReportGeneratedDate
                              }).FirstOrDefaultAsync();
            }
            return null;
        }

        public async Task<LabReportModel> GetTestReportById(int id)
        {
            if (_db != null)
            {
                //LINQ
                return await(from t in _db.TestReports
                             from e in _db.Employees
                             from p in _db.Patients
                             where t.DoctorId == e.EmployeeId && t.LabTechnicianId == e.EmployeeId && t.PatientId == p.PatientId && t.TestReportId==id
                             select new LabReportModel
                             {
                                 TestReportId = t.TestReportId,
                                 TestReport = t.TestReport,
                                 PatientName = p.PatientName,
                                 DoctorName = e.EmployeeName,
                                 LabTechnicianName = e.EmployeeName,
                                 ReportGeneratedDate = t.ReportGeneratedDate
                             }).FirstOrDefaultAsync();
            }
            return null;
        }

        public async Task UpdateTestReport(TestReports test)
        {
            if (_db != null)
            {
                _db.TestReports.Update(test);
                await _db.SaveChangesAsync();
            }
        }
    }
}
