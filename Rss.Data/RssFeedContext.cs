using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Rss.Data
{
    public partial class RssFeedContext : DbContext
    {
        public RssFeedContext()
        {
        }

        public RssFeedContext(DbContextOptions<RssFeedContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Feeds> Feeds { get; set; }
        public virtual DbSet<Subscription> Subscription { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Feeds>(entity =>
            {
                entity.Property(e => e.Url).IsRequired();
            });

            modelBuilder.Entity<Subscription>(entity =>
            {
                entity.HasOne(d => d.Feed)
                    .WithMany(p => p.Subscription)
                    .HasForeignKey(d => d.FeedId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Subscription_Feeds");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Subscription)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Subscription_Users");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.UserEmail)
                    .HasMaxLength(30)
                    .IsFixedLength();

                entity.Property(e => e.UserId).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
