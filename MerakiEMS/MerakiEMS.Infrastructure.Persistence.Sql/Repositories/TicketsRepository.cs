using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Repositories
{
    public class TicketsRepository : ITicketsRepository
    {
        private readonly UserContext _context;
        public TicketsRepository(UserContext context)
        {
            _context = context;
        }
        public async Task<AddTicketResponse> AddTicket(Tickets ticket)
        {
            try

            {
                var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
                var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
                ticket.Status = "Pending";
                ticket.CreatedAt = Time;
                ticket.UpdatedAt = Time;
                _context.Tickets.Add(ticket);
                AddTicketResponse res = new AddTicketResponse();
                await _context.SaveChangesAsync();
                return res;

            }
            catch (Exception ex)
            {
                throw (ex);
                return null;
            }

        }
        public async Task<List<Tickets>> GetAllTickets()
        {
            var response = await _context.Tickets.OrderByDescending(s => s.CreatedAt).ToListAsync();
            if (response == null)
            {
                return null;
            }
            else
            {
                return response;
            }
        }
        public async Task<List<Tickets>> GetTickets(int id)
        {
            var response = await _context.Tickets.Where(s => s.RequesterID == id).ToListAsync();
            if (response == null)
            {
                return null;
            }
            else
            {
                return response;
            }
        }
        public async Task<AddTicketResponse> UpdateTickets(UpdateTicketRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            AddTicketResponse res = new AddTicketResponse();
            var response = await _context.Tickets.Where(s => s.ID == req.ID).FirstOrDefaultAsync();
            if (response == null)
            {
                return null;
            }
            else
            {
                response.Status = req.Status;
                response.Reviewer = req.Reviewer;
                response.UpdatedAt = Time;
                await _context.SaveChangesAsync();
                return res;
            }
        }
    }
}
