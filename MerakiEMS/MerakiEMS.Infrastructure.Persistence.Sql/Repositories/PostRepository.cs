using Microsoft.EntityFrameworkCore;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;


namespace MerakiEMS.Infrastructure.Persistence.Sql.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly PostsContext _context;
        public PostRepository(PostsContext context)
        {
            _context = context;
        }
        public async Task<Posts> Insert(Posts post)
        {
            _context.Add(post);
            await _context.SaveChangesAsync();
            return new Posts();
        }
        public async Task<List<Posts>> GetPosts()
        {
            if (_context.Posts == null)
            {
                return null;
            }
            var response = await _context.Posts.OrderByDescending(s => s.DateTime).ToListAsync();
            return response;
             
        }
        public async Task<Posts> GetPost(int id)
        {
            if (_context.Posts == null)
            {
                return null;
            }
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return null;
            }
            return post;
        }
        public async Task<Posts> Update(Posts post, int id)
        {
            if (id != post.ID)
            {
                return null;
            }
            _context.Entry(post).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostAvailable(id))
                {
                    return null;

                }
                else
                {
                    throw;
                }
            }
            return post;
        }
        private bool PostAvailable(int id)
        {
            return (_context.Posts?.Any(x => x.ID == id)).GetValueOrDefault();
        }
        public async Task<Posts>Delete(int id)
        {
            if (_context.Posts == null)
            {
                return null;
            }
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return post;
            }
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return post;
        }
    }
}
