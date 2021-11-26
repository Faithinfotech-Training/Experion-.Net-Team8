using Clinic_Management_System_8.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Repository
{
    public interface IDoctor
    {
        //-- Doctors are able to view the details of patients
        Task<List<DoctorPatientModel>> GetDoctorsPatientDetails();
    }
}
