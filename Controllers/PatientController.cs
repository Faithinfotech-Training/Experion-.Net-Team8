using Clinic_Management_System_8.Models;
using Clinic_Management_System_8.Repository;
using Microsoft.AspNetCore.Authorization;
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
    public class PatientController : ControllerBase
    {
        IPatient patientRepo;
        public PatientController(IPatient _patientRepo)
        {
            patientRepo = _patientRepo;
        }

        //--- add a patient ---//
        #region AddPatient

        [HttpPost]
        [Authorize]

        public async Task<IActionResult> AddPatient(Patients patient)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newPatient = await patientRepo.AddPatient(patient);
                    if (newPatient > 0)
                    {
                        return Ok(newPatient);
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


        //--- Update Patient ---//
        #region UpdatePatient

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdatePatient([FromBody] Patients patient)
        {
            //Check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    await patientRepo.UpdatePatient(patient);
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


        //--- View all Patients ---//
        #region ViewPatients

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> ViewAllPatients()
        {
            try
            {
                var hobbies = await patientRepo.ViewAllPatients();
                if (hobbies != null)
                {
                    return Ok(hobbies);
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
