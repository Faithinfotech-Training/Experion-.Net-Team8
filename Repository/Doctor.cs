using Clinic_Management_System_8.Models;
using Clinic_Management_System_8.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Repository
{
    public class Doctor : IDoctor
    {
        private CMSContext db;
        
        // Injecting the context file into the constructor
        public Doctor(CMSContext _db)
        {
            db = _db;
        }

        #region ViewPatientDetailsByDoctor
        public Task<List<DoctorPatientModel>> GetDoctorsPatientDetails()
        {
            throw new NotImplementedException();
        }
        #endregion

    }
}
