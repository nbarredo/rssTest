using System;
using System.Collections.Generic;

namespace Rss.Data
{
    public partial class Subscription
    {
        public int UserId { get; set; }
        public int FeedId { get; set; }
        public int Id { get; set; }

        public virtual Feeds Feed { get; set; }
        public virtual Users User { get; set; }
    }
}
