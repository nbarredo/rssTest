using System;
using System.Collections.Generic;

namespace Rss.Data
{
    public partial class Feeds
    {
        public Feeds()
        {
            Subscription = new HashSet<Subscription>();
        }

        public int Id { get; set; }
        public string Url { get; set; }

        public virtual ICollection<Subscription> Subscription { get; set; }
    }
}
