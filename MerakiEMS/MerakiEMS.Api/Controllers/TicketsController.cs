using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace MerakiEMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : Controller
    {
        private readonly ITicketsService _ticketsService;


        public TicketsController(ITicketsService ticketsService)
        {
            _ticketsService = ticketsService;

        }
        [HttpPost]
        [Route("AddTicket")]
        public async Task<AddTicketResponse> AddTicket(Tickets ticket)
        {
            var response = await _ticketsService.AddTicket(ticket);
            return response;
        }
        [HttpGet]
        [Route("GetAllTickets")]
        public async Task<List<GetTicketResponse>> GetAllTickets()
        {
            var response = await _ticketsService.GetAllTickets();
            return response;
        }
        [HttpPost]
        [Route("GetTickets")]
        public async Task<List<GetTicketResponse>> GetTickets(int id)
        {
            var response = await _ticketsService.GetTickets(id);
            return response;
        }
        [HttpPost]
        [Route("UpdateTicket")]
        public async Task<AddTicketResponse> UpdateTicket(UpdateTicketRequest request)
        {
            var response = await _ticketsService.UpdateTickets(request);
            return response;
        }
    }
}
