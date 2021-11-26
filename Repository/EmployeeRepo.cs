using Clinic_Management_System_8.Models;
using Clinic_Management_System_8.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Repository
{
    public class EmployeeRepo : IEmlpoyeeRepo
    {
        public Task<Employees> AddEmployee(Employees employee)
        {
            throw new NotImplementedException();
        }

        public Task<Employees> DeleteEmployee(int id)
        {
            throw new NotImplementedException();
        }

        public Task<EmployeeModel> GetEmployeeById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<EmployeeModel>> GetEmployees()
        {
            throw new NotImplementedException();
        }

        public Task<Employees> UpdateEmployee(Employees employee)
        {
            throw new NotImplementedException();
        }
    }
}
