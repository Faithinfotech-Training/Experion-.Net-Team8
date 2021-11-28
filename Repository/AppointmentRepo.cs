using Clinic_Management_System_8.Models;
using Clinic_Management_System_8.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Repository
{
    public class AppointmentRepo : IAppointment
    {
        private CMSContext dbContext;

        //Dependency Injection
        //--- Parameterized Constructor ---//
        public AppointmentRepo(CMSContext _dbContext)
        {
            dbContext = _dbContext;
        }

        //--- Add Appointments ---//
        #region AddAppointment

        public async Task<int> AddAppointment(Appointments appointment)
        {
            if (dbContext != null)
            {
                await dbContext.Appointments.AddAsync(appointment);
                await dbContext.SaveChangesAsync();
                return appointment.AppointmentId;
            }
            return 0;
        }

        #endregion


        //--- Update Appointments ---//
        #region UpdateAppointment

        public async Task<Appointments> UpdateAppointment(Appointments appointment)
        {
            if (dbContext != null)
            {
                dbContext.Appointments.Update(appointment);
                await dbContext.SaveChangesAsync();
                return appointment;
            }
            return null;
        }

        #endregion


        //--- View Appointment By Date ---//
        #region ViewAppointmentByDate

        public async Task<AppointmentViewModel> ViewAppointmentByDate(DateTime date)
        {
            //--- get appointment by id ---//
            if (dbContext != null)
            {
                //-- LINQ --//
                //-- joining Appointments, AppointmentTypes, Patients and Employees  --//
                return await (from a in dbContext.Appointments
                              from at in dbContext.AppointmentTypes
                              from p in dbContext.Patients
                              from e in dbContext.Employees
                              where a.AppointmentTypeId == at.AppointmentTypeId &&
                              a.PatientId == p.PatientId &&
                              a.EmployeeId == e.EmployeeId &&
                              a.AppointmentDate==date
                              select new AppointmentViewModel
                              {
                                  AppointmentId = a.AppointmentId,
                                  AppointmentType = at.AppointmentType,
                                  PatientName = p.PatientName,
                                  EmployeeName = e.EmployeeName,
                                  AppointmentStatus = a.AppointmentStatus,
                                  AppointmentDate = a.AppointmentDate
                              }).FirstOrDefaultAsync();
            }
            return null;
        }

        #endregion


        //--- View all Appointment ---//
        #region ViewAllAppointments

        public async Task<List<AppointmentViewModel>> ViewAllAppointments()
        {
            if (dbContext != null)
            {
                //-- LINQ --//
                //-- joining Appointments, AppointmentTypes, Patients and Employees  --//
                return await (from a in dbContext.Appointments
                              from at in dbContext.AppointmentTypes
                              from p in dbContext.Patients
                              from e in dbContext.Employees
                              where a.AppointmentTypeId == at.AppointmentTypeId &&
                              a.PatientId == p.PatientId &&
                              a.EmployeeId == e.EmployeeId
                              select new AppointmentViewModel
                              {
                                  AppointmentId = a.AppointmentId,
                                  AppointmentType = at.AppointmentType,
                                  PatientName = p.PatientName,
                                  EmployeeName = e.EmployeeName,
                                  AppointmentStatus = a.AppointmentStatus,
                                  AppointmentDate = a.AppointmentDate
                              }).ToListAsync();
            }

            return null;
        }

        #endregion

    }
}
