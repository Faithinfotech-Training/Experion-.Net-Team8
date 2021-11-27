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
    public class TestReportController : ControllerBase
    {
        ITestReport postRepository;
        public TestReportController(ITestReport _p)
        {
            postRepository = _p;
        }
        #region Get test report

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetTestReport()
        {
            try
            {
                var posts = await postRepository.GetTestReport();
                if (posts == null)
                {
                    return NotFound();
                }
                return Ok(posts);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        #endregion
        #region Add test report
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddTestReport(TestReports test)
        {
            //check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    var postId = await postRepository.AddTestReport(test);
                    if (postId>0)
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
        #region update test report
        [HttpPut]
        //[Authorize]
        public async Task<IActionResult> UpdateTestReport(TestReports test)
        {
            //Check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    await postRepository.UpdateTestReport(test);
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
        #region Getreport by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTestReportById(int id)
        {
            try
            {
                var post = await postRepository.GetTestReportById(id);
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
        #region Getreport by date
        [HttpGet("{date}")]
        public async Task<IActionResult> GetTestReportByDate(DateTime date)
        {
            try
            {
                var post = await postRepository.GetTestReportByDate(date);
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestReport(int id)
        {
            //Check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    await postRepository.DeleteTestReport(id);
                    return Ok();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }
    }
}
