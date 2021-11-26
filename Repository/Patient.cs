using Clinic_Management_System_8.Models;
using Clinic_Management_System_8.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Repository
{
    public class Patient : IPatient
    {
        //-- Creating the db context --//
        private CMSContext contextDB;

        //-- Parameterized constructor  --//
        public Patient(CMSContext _contextDB)
        {
            contextDB = _contextDB;
        }

        //--- add Patient ---//
        #region AddPatient

        public async Task<int> AddPatient(Patients patient)
        {
            if (contextDB != null)
            {
                await contextDB.Patients.AddAsync(patient);
                await contextDB.SaveChangesAsync();
                return patient.PatientId;
            }
            return 0;
        }

        #endregion


        //--- Update Patient ---//
        #region UpdatePatient

        public async Task<Patients> UpdatePatient(Patients patient)
        {
            if (contextDB != null)
            {
                contextDB.Patients.Update(patient);
                await contextDB.SaveChangesAsync();
                return patient;
            }
            return null;
        }

        #endregion


        //--- View Patients ---//
        #region ViewAllPatients

        public async Task<List<PatientViewModel>> ViewAllPatients()
        {
            if (contextDB != null)
            {
                //LINQ
                return await (from p in contextDB.Patients
                              select new PatientViewModel
                              {
                                  PatientId = p.PatientId,
                                  PatientName = p.PatientName,
                                  Age = p.Age,
                                  Address = p.Address,
                                  MobileNo = p.MobileNo,
                                  Gender = p.Gender
                              }).ToListAsync();
            }
            return null;
        }

        #endregion

    }
}
