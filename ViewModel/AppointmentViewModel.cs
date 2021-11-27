using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.ViewModel
{
    public class AppointmentViewModel
    {
        public int AppointmentId { get; set; }
        public String AppointmentType { get; set; }
        public String PatientName { get; set; }
        public String EmployeeName { get; set; }
        public bool AppointmentStatus { get; set; }
        public DateTime AppointmentDate { get; set; }
    }
}
