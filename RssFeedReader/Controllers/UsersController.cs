using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rss.Data;

namespace RssFeedReader.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RssFeedContext _context;

        public UsersController(RssFeedContext context)
        {
            _context = context;
        }
        // GET: api/Users/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<Users>> GetUsers(string userId)
        {
            try
            {
                var users = await _context.Users.Include(u => u.Subscription).FirstAsync(u => u.UserId == userId);

                if (users == null)
                {
                    return NotFound();
                }

                return users;
            }
            catch (Exception ex)
            {

                throw;
            }
        }



        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users user)
        {
            try
            {
                _context.Users.Add(user);
                if (UsersExists(user.UserId))
                {
                    return Conflict("User already exist");
                }
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUsers", new { id = user.Id }, user);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        private bool UsersExists(string userId)
        {
            return _context.Users.Any(e => e.UserId == userId);
        }
    }
}
