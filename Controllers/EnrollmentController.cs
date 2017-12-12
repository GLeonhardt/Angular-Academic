using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Academic.Data;
using Academic.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Academic.Controllers
{
    [Route("api/[controller]")]
    public class EnrollmentController : Controller
    {

        public EnrollmentController(AcademicContext dbContext, IOptions<AppSettings> options)
        {
            DbContext = dbContext;
            AppSettings = options.Value;
        }

        private AppSettings AppSettings { get; }
        public AcademicContext DbContext { get; }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await DbContext.Enrollment.Include(m => m.Classroom)
                .ThenInclude(m => m.subject).ThenInclude(m => m.course)
                .Include(m => m.Student)
                .ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) //read
        {
            return Ok(await DbContext.Enrollment.SingleOrDefaultAsync(m => m.Id == id));

        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] Enrollment value) // CREATE
        {
            if (value != null)
            {
                await DbContext.Enrollment.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.Classroom = await DbContext.Classroom.SingleOrDefaultAsync(m => m.Id == value.ClassroomId);
                value.Student = await DbContext.Student.SingleOrDefaultAsync(m => m.Id == value.StudentId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Enrollment value) // UPDATE
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Enrollment.FirstOrDefaultAsync(t => t.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.dateEnrollment = value.dateEnrollment; 
            updateValue.Hour = value.Hour;
            updateValue.Student = value.Student;
            updateValue.Classroom = value.Classroom;


            DbContext.Enrollment.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var enrollment = await DbContext.Enrollment.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Enrollment.Remove(enrollment);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }



    }
}