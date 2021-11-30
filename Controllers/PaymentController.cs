using Clinic_Management_System_8.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clinic_Management_System_8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        IPayment pay ;
        public PaymentController(IPayment _p)
        {
            pay = _p;
        }
        #region Get payment details

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetPaymentDetails()
        {
            try
           {
                var pays = await pay.GetPaymentDetails();
                if (pays == null)
                {
                    return NotFound();
                }
                return Ok(pays);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        #endregion
        #region Add payment details
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddPayment(Payments payment)
        {
            //check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    var postId = await pay.AddPayment(payment);
                    if (postId > 0)
                    {
                        return Ok(postId);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        #endregion
        #region update payment details
        [HttpPut]
        //[Authorize]
        public async Task<IActionResult> UpdatePayment(Payments payment)
        {
            //Check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    await pay.UpdatePayment(payment);
                    return Ok();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }
        #endregion
        #region Get payment by patient id 
        [HttpGet]
        [Route("Id")]

        public async Task<IActionResult> GetPaymentByPatientId(int id)
        {
            try
            {
                var post = await pay.GetPaymentByPatientId(id);
                if (post != null)
                {
                    return Ok(post);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        #endregion
        #region Get payment by id

        [HttpGet("{id}")]
        
        public async Task<IActionResult> GetPaymentById(int id)
        {
            try
            {
                var post = await pay.GetPaymentById(id);
                if (post != null)
                {
                    return Ok(post);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        #endregion

    }
}
