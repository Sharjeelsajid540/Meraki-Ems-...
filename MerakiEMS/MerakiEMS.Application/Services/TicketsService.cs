using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Services
{
    public class TicketsService : ITicketsService
    {
        private readonly ITicketsRepository _ticketsRepository;

        public TicketsService(ITicketsRepository ticketsRepository)
        {
            _ticketsRepository = ticketsRepository;
        }
        public async Task<AddTicketResponse> AddTicket(Tickets ticket)
        {
            try
            {
                var res = await _ticketsRepository.AddTicket(ticket);
                AddTicketResponse response = new AddTicketResponse();
                if (res != null)
                {
                    response.IsRequestSuccessfull = true;
                    response.SuccessMessage = "Ticket Added Successfully";
                }
                else
                {
                    response.IsRequestSuccessfull = false;
                    response.SuccessMessage = "Failed to add Ticket!";

                }
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

        }
        public async Task<List<GetTicketResponse>> GetAllTickets()
        {
            var response = await _ticketsRepository.GetAllTickets();
            List<GetTicketResponse> res = new List<GetTicketResponse>();
            if (response != null)
            {
                foreach (var ticket in response)
                {
                    GetTicketResponse item = new GetTicketResponse();
                    item.ID = ticket.ID;
                    item.Title = ticket.Title;
                    item.RequesterName = ticket.RequesterName;
                    item.Reviewer = ticket.Reviewer;
                    item.Priority = ticket.Priority;
                    item.Status = ticket.Status;
                    item.RequesterID = ticket.RequesterID;
                    item.Category = ticket.Category;
                    item.Description = ticket.Description;
                    item.CreatedAt = ticket.CreatedAt.ToString("MM-dd-yyyy");
                    item.UpdatedAt = ticket.UpdatedAt.ToString("MM-dd-yyyy");
                    res.Add(item);
                }
                return res;
            }
            else
            {
                return null;
            }
        }

        public async Task<List<GetTicketResponse>> GetTickets(int id)
        {
            var response = await _ticketsRepository.GetTickets(id);
            List<GetTicketResponse> res = new List<GetTicketResponse>();
            if (response != null)
            {
                foreach (var ticket in response)
                {

                    GetTicketResponse item = new GetTicketResponse();
                    item.ID = ticket.ID;
                    item.Title = ticket.Title;
                    item.RequesterName = ticket.RequesterName;
                    item.Reviewer = ticket.Reviewer;
                    item.Priority = ticket.Priority;
                    item.Status = ticket.Status;
                    item.RequesterID = ticket.RequesterID;
                    item.Category = ticket.Category;
                    item.Description = ticket.Description;
                    item.CreatedAt = ticket.CreatedAt.ToString("MM-dd-yyyy");
                    item.UpdatedAt = ticket.UpdatedAt.ToString("MM-dd-yyyy");

                    res.Add(item);
                }
                return res;
            }
            else
            {
                return null;
            }
        }

        public async Task<AddTicketResponse> UpdateTickets(UpdateTicketRequest req)
        {
            var response = await _ticketsRepository.UpdateTickets(req);
            AddTicketResponse item = new AddTicketResponse();
            if (response != null)
            {
                item.IsRequestSuccessfull = true;
                item.SuccessMessage = "Ticket Updated Successfully";
            }
            else
            {
                item.IsRequestSuccessfull = false;
                item.SuccessMessage = "Failed To Update!";
            }
            return item;
        }
    }
}
