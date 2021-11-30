using Clinic_Management_System_8.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Repository
{
    public class Department : IDepartment
    {
        private CMSContext db;

        //Dependency Injection
        //--- Parameterized Constructor ---//
        public Department(CMSContext _db)
        {
            db = _db;
        }

        //--- fetching all the departments ---//
        public async Task<List<Departments>> GetDepartments()
        {
            if (db != null)
            {
                return await db.Departments.ToListAsync();
            }
            return null;
        }


    }
}
