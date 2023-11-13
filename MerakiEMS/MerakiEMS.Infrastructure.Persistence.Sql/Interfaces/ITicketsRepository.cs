using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Interfaces
{
    public interface ITicketsRepository
    {
        Task<AddTicketResponse> AddTicket(Tickets ticket);
        Task<List<Tickets>> GetAllTickets();
        Task<List<Tickets>> GetTickets(int id);
        Task<AddTicketResponse> UpdateTickets(UpdateTicketRequest req);
    }
}
