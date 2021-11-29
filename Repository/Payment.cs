using Clinic_Management_System_8.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Models
{
    public class Payment:IPayment
    {
        CMSContext _db;

        public Payment(CMSContext db)
        {
            _db = db;
        }
        #region Add Payment

        public async  Task<int> AddPayment(Payments payment)
        {
            if (_db != null)
            {
                await _db.Payments.AddAsync(payment);
                await _db.SaveChangesAsync();
                return payment.PaymentId;
            }
            return 0;
        }
        #endregion
        #region Get payment
        public async Task<List<PaymentViewModel>> GetPaymentDetails()
        {
            //--- get  all payments ---//

            if (_db != null)
            {
                //LINQ
                return await(from p in _db.Payments
                             from t in _db.Patients
                             where t.PatientId==p.PatientId
                             select new PaymentViewModel
                             {
                                 PaymentId=p.PaymentId,
                                 Amount=p.Amount,
                                 PatientName=t.PatientName,
                                 PaymentDate=p.PaymentDate
                             }).ToListAsync();
            }
            return null;
        }
        #endregion
        #region Get payment details by patient id

       
        public async Task<PaymentViewModel> GetPaymentByPatientId(int id)
        {
            //--- get payment by patient id   ---//

            if (_db != null)
            {
                //LINQ
                return await(from p in _db.Payments
                             from t in _db.Patients
                             where p.PatientId == t.PatientId && p.PatientId==id
                             select new PaymentViewModel
                             {
                                 PaymentId = p.PaymentId,
                                 Amount = p.Amount,
                                 PatientName = t.PatientName,
                                 PaymentDate = p.PaymentDate
                             }).FirstOrDefaultAsync();
            }
            return null;
        }
        #endregion
        #region Update payment      
        public async Task UpdatePayment(Payments payment)
        {
            if (_db != null)
            {
                _db.Payments.Update(payment);
                await _db.SaveChangesAsync();
            }
        }
        #endregion
    }
}
