using System;
using System.Collections.Generic;

namespace Clinic_Management_System_8.Models
{
    public partial class Employees
    {
        public Employees()
        {
            Appointments = new HashSet<Appointments>();
            EmployeeSpecializations = new HashSet<EmployeeSpecializations>();
            LabHasTechnician = new HashSet<LabHasTechnician>();
            Prescriptions = new HashSet<Prescriptions>();
            Queries = new HashSet<Queries>();
            TestReportsDoctor = new HashSet<TestReports>();
            TestReportsLabTechnician = new HashSet<TestReports>();
        }

        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int Age { get; set; }
        public decimal MobileNo { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfJoining { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
        public bool IsActive { get; set; }

        public virtual Departments Department { get; set; }
        public virtual Roles Role { get; set; }
        public virtual ICollection<Appointments> Appointments { get; set; }
        public virtual ICollection<EmployeeSpecializations> EmployeeSpecializations { get; set; }
        public virtual ICollection<LabHasTechnician> LabHasTechnician { get; set; }
        public virtual ICollection<Prescriptions> Prescriptions { get; set; }
        public virtual ICollection<Queries> Queries { get; set; }
        public virtual ICollection<TestReports> TestReportsDoctor { get; set; }
        public virtual ICollection<TestReports> TestReportsLabTechnician { get; set; }
    }
}
