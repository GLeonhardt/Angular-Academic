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
    public class StateController : Controller
    {

        public StateController(AcademicContext dbContext, IOptions<AppSettings> options)
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
            return Ok(await DbContext.State.ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) //read
        {
            return Ok(await DbContext.State.SingleOrDefaultAsync(m => m.id == id));

        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] State value) // CREATE
        {
            if (value != null)
            {
                await DbContext.State.AddAsync(value);
                await DbContext.SaveChangesAsync();
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] State value) // UPDATE
        {
            if (value == null || value.id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.State.FirstOrDefaultAsync(t => t.id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.Name = value.Name; 
            

            DbContext.State.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var state = await DbContext.State.SingleOrDefaultAsync(m => m.id == id);
            DbContext.State.Remove(state);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }



    }
}