using Clinic_Management_System_8.Models;
using Clinic_Management_System_8.Repository;
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
    public class PrescriptionController : ControllerBase
    {
        IPrescription preRepo;
        public PrescriptionController(IPrescription _p)
        {
            preRepo = _p;
        }

        #region Get all Prescription

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetPrescriptionDetails()
        {
            try
            {
                var notes = await preRepo.GetPrescriptionDetails();
                if (notes == null)
                {
                    return NotFound();
                }
                return Ok(notes);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        #endregion
        #region Prescription for a period
        [HttpGet]
        [Route("Upto")]
        public async Task<IActionResult> GetPrescriptionForPeriod(DateTime date)
        {
            try
            {
                var prescription = await preRepo.GetPrescriptionForPeriod(date);
                if (prescription == null)
                {
                    return NotFound();
                }
                return Ok(prescription);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
#endregion
        #region Add prescription
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddPrescription(Prescriptions note)
        {
            //check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    var postId = await preRepo.AddPrescription(note);
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
        #region update prescription
        [HttpPut]
        //[Authorize]
        public async Task<IActionResult> UpdatePrescription(Prescriptions note)
        {
            //Check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    await preRepo.UpdatePrescription(note);
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
       
        #region Get Prescription By PatientId 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrescriptionByPatientId(int id)
        {
            try
            {
                var patient = await preRepo.GetPrescriptionByPatientId(id); ;
                if (patient != null)
                {
                    return Ok(patient);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        #endregion
        #region Get Prescription By date
        [HttpGet("{date}")]
        public async Task<IActionResult> GetPrescriptionByDate(DateTime date)
        {
            try
            {
                var patient = await preRepo.GetPrescriptionByDate(date);
                if (patient != null)
                {
                    return Ok(patient);
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

   