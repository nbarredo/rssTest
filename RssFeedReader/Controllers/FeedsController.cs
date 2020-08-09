using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeHollow.FeedReader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rss.Data;
using RssFeedReader.ViewModel;

namespace RssFeedReader.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedsController : ControllerBase
    {
        private readonly RssFeedContext _context;

        public FeedsController(RssFeedContext context)
        {
            _context = context;
        }

        // GET: api/Feeds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feeds>>> GetFeeds()
        {
            return await _context.Feeds.ToListAsync();
        }



        [Route("details")]
        [HttpGet]
        public async Task<IEnumerable<FeedViewModel>> GetFeedsWithDetails()
        {
            var feedList = await _context.Feeds.ToListAsync();
            var list = feedList.Select(f => new FeedViewModel (){ Id = f.Id, Details = FeedReader.ReadAsync(f.Url).Result });

            return list;
        }

        [Route("my/{userId}")]
        [HttpGet]
        public async Task<IEnumerable<FeedViewModel>> GetMyFeeds(int userId)
        {
            var feedList = await _context.Feeds.Where(f=>f.Subscription.Any(s=>s.UserId== userId)).ToListAsync();
            var list = feedList.Select(f => new FeedViewModel() { Id = f.Id, Details = FeedReader.ReadAsync(f.Url).Result });

            return list;
        }

        // GET: api/Feeds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Feed>> GetFeeds(int id)
        {
            var feed = await _context.Feeds.FindAsync(id);

            if (feed == null)
            {
                return NotFound();
            }
            var feedDetail =await FeedReader.ReadAsync(feed.Url); 
            return feedDetail;
        }
        // POST: api/Feeds
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Feeds>> PostFeeds(Feeds feed)
        {
            if (FeedsExists(feed.Url.Trim()))
            {
                return Conflict("Feed already exist");
            }
            _context.Feeds.Add(feed);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFeeds", new { id = feed.Id }, feed);
        }

       
     

        private bool FeedsExists(string url)
        {
            return _context.Feeds.Any(e => e.Url.Trim() == url);
        }
    }
}
