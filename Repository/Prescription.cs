using Clinic_Management_System_8.Models;
using Clinic_Management_System_8.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Repository
{
    public class Prescription : IPrescription
    {
        CMSContext _db;

        public Prescription(CMSContext db)
        {
            _db = db;
        }
        #region Prescription added
        public async Task<int> AddPrescription(Prescriptions note)
        {
           
                if (_db != null)
                {
                    await _db.Prescriptions.AddAsync(note);
                    await _db.SaveChangesAsync();
                    return note.PrescriptionId;
                }
                return 0;


            }

       

        public async Task<PrescriptionViewModel> GetPrescriptionByDate(DateTime date)
        {
            if (_db != null)
            {
                //LINQ
                return await(from p in _db.Prescriptions
                             from e in _db.Employees
                             from t in _db.Patients
                             where p.EmployeeId == e.EmployeeId && p.PatientId == t.PatientId && p.PrescriptionDate==date
                             select new PrescriptionViewModel
                             {
                                 PrescriptionId = p.PrescriptionId,
                                 Prescription = p.Prescription,
                                 PrescriptionDate = p.PrescriptionDate,
                                 DoctorName = e.EmployeeName,
                                 PatientName = t.PatientName
                             }).FirstOrDefaultAsync();
            }
            return null;

        }



        #endregion


        public async Task<PrescriptionViewModel> GetPrescriptionByPatientId(int id)
        {
            if (_db != null)
            {
                //LINQ
                return await(from p in _db.Prescriptions
                             from e in _db.Employees
                             from t in _db.Patients
                             where p.EmployeeId == e.EmployeeId && p.PatientId == t.PatientId && p.PatientId==id
                             select new PrescriptionViewModel
                             {
                                 PrescriptionId = p.PrescriptionId,
                                 Prescription = p.Prescription,
                                 PrescriptionDate = p.PrescriptionDate,
                                 DoctorName = e.EmployeeName,
                                 PatientName = t.PatientName
                             }).FirstOrDefaultAsync();
                  }
                    return null;
        
            }

        public async Task<List<PrescriptionViewModel>> GetPrescriptionDetails()
        {
            if (_db != null)
            {
                //LINQ
                return await (from p in _db.Prescriptions
                              from e in _db.Employees
                              from t in _db.Patients
                              where p.EmployeeId == e.EmployeeId && p.PatientId == t.PatientId
                              select new PrescriptionViewModel
                              {
                                  PrescriptionId=p.PrescriptionId,
                                  Prescription=p.Prescription,
                                  PrescriptionDate=p.PrescriptionDate,
                                  DoctorName=e.EmployeeName,
                                  PatientName=t.PatientName
                              }).ToListAsync();
            }
            return null;
        }

        public async  Task<List<PrescriptionViewModel>> GetPrescriptionForPeriod(DateTime date)
        {
            if (_db != null)
            {
                //LINQ
                return await(from p in _db.Prescriptions
                             from e in _db.Employees
                             from t in _db.Patients
                             where p.EmployeeId == e.EmployeeId && p.PatientId == t.PatientId&& p.PrescriptionDate<date
                             select new PrescriptionViewModel
                             {
                                 PrescriptionId = p.PrescriptionId,
                                 Prescription = p.Prescription,
                                 PrescriptionDate = p.PrescriptionDate,
                                 DoctorName = e.EmployeeName,
                                 PatientName = t.PatientName
                             }).ToListAsync();
            }
            return null;
        }

        public async Task UpdatePrescription(Prescriptions note)
        {
            if (_db != null)
            {
                _db.Prescriptions.Update(note);
                await _db.SaveChangesAsync();
            }
        }
    }
}
