using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Interfaces
{
    public interface ITicketsService
    {
        Task<AddTicketResponse> AddTicket(Tickets ticket);
        Task<List<GetTicketResponse>> GetAllTickets();
        Task<List<GetTicketResponse>> GetTickets(int id);
        Task<AddTicketResponse> UpdateTickets(UpdateTicketRequest req);
    }
}
