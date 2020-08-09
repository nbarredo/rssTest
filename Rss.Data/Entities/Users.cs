using System;
using System.Collections.Generic;

namespace Rss.Data
{
    public partial class Users
    {
        public Users()
        {
            Subscription = new HashSet<Subscription>();
        }

        public int Id { get; set; }
        public string UserEmail { get; set; }
        public string UserId { get; set; }

        public virtual ICollection<Subscription> Subscription { get; set; }
    }
}
