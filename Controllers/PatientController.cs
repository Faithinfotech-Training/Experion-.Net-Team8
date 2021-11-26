using Clinic_Management_System_8.Models;
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
        IPatientRepo patientRepo;
        public PatientController(IPatientRepo _patientRepo)
        {
            patientRepo = patientRepo;
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
                    if (newPatient != null)
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
    }
}
