using MailKit.Security;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Services
{
    public class LeavesService : ILeavesService
    {
        private readonly ILeavesRepository _leavesRepository;
        public LeavesService(ILeavesRepository leavesRepository)
        {
            _leavesRepository = leavesRepository;
        }

        public async Task<EmailResult> SendLeaveEmail(EmailID email)
        {
            var postt = await _leavesRepository.SendLeaveEmail(email);

            if (postt == null)
            {
                return new EmailResult { Success = false, Message = "Email sending failed: User not found." };
            }

            // Construct the body template
            string bodyTemplate = $"<div>Dear,<br></div>";
            bodyTemplate += $"<div><strong>{postt.EmpName}</strong> would like to request leave<br> from <strong>{postt.From:MM-dd-yyyy} to {postt.To:MM-dd-yyyy}</strong>.<br></div>";
            bodyTemplate += "Please review the leave request and let him know if any further information is required.<br>";
            bodyTemplate += $"<div><strong> Meraki IT Support</strong></div>";

            // Iterate through the list of email addresses and send individual emails
            foreach (var recipientEmail in postt.Emails)
            {
                // Create a unique subject for each email
                string subject = $"Leave Request for {postt.Description} - {recipientEmail}";

                try
                {
                    var emaill = new MimeMessage();
                    emaill.From.Add(MailboxAddress.Parse("taybb512@gmail.com"));
                    emaill.To.Add(MailboxAddress.Parse(recipientEmail)); // Use the recipient's email here
                    emaill.Subject = subject;
                    emaill.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = bodyTemplate };

                    using (var smtp = new MailKit.Net.Smtp.SmtpClient())
                    {
                        smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                        smtp.Authenticate("taybb512@gmail.com", "wkuoybrzpqxgyjaw");
                        smtp.Send(emaill);
                        smtp.Disconnect(true);
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception or handle it as needed
                    return new EmailResult { Success = false, Message = "Email sending failed: " + ex.Message };
                }
            }

            return new EmailResult { Success = true, Message = "Emails sent successfully." };
        }
        public async Task<ApiResponse<string>> RequestLeave(LeaveRequest req)
        {
            var response = new ApiResponse<string>();
            if (req == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "User fields can not be empty!";
            }
            else
            {
                var postt = await _leavesRepository.RequestLeave(req);
                if (postt == null)
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "User Already Exists!";

                }
                else
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "Leave added successfully";
                }

            }

            return response;

        }
        public async Task<List<LeaveResponse>> GetLeave(UserID user)
        {

            List<LeaveResponse> responses = new List<LeaveResponse>();
            var res = await _leavesRepository.GetLeave(user);
            if (res == null)
            {
                return null;
            }
            else
            {

                foreach (var result in res)
                {
                    var response = new LeaveResponse();
                    response.ID = result.ID;
                    response.Name = result.Name;
                    response.UserID = result.UserID;
                    response.Status = result.Status;
                    response.Comments = result.Comments;
                    response.Description = result.Description;
                    response.From = result.From?.ToString("yyyy-MM-dd");
                    response.To = result.To?.ToString("yyyy-MM-dd");
                    response.AdminRequestViewer = result.AdminRequestViewer;
                    response.CreatedAt = result.CreatedAt?.ToString("yyyy-MM-dd");
                    response.UpdatedAt = result.UpdatedAt?.ToString("yyyy-MM-dd");

                    responses.Add(response);

                }


                return responses;
            }
        }
        public async Task<AdminLeaveResponse> AdminLeaveRequest(AdminRequest req)
        {
            AdminLeaveResponse response = new AdminLeaveResponse();
            try
            {
                var res = await _leavesRepository.AdminLeaveRequest(req);
                if (res != null)
                {
                    response.SuccessMessage = "Request Updated Successfull";
                    response.IsRequestSuccessfull = "true";

                }
                else
                {
                    response.IsRequestSuccessfull = "false";
                    response.SuccessMessage = "Leave Request Failed!";
                }
                return response;
            }
            catch (Exception ex)
            {
                response.IsRequestSuccessfull = "false";
                response.Errors = new List<string> { ex.Message };
                return response;

            }


        }
        public async Task<List<LeaveResponse>> GetAllLeave(bool isLateFilter)
        {
            List<LeaveResponse> responses = new List<LeaveResponse>();
            try
            {
                var res = await _leavesRepository.GetAllLeave(isLateFilter);
                if (res == null)
                {
                    return null;
                }
                else
                {

                    foreach (var result in res)
                    {
                        var response = new LeaveResponse();
                        response.ID = result.ID;
                        response.Name = result.Name;
                        response.UserID = result.UserID;
                        response.Status = result.Status;
                        response.Comments = result.Comments;
                        response.Description = result.Description;
                        response.From = result.From?.ToString("yyyy-MM-dd");
                        response.To = result.To?.ToString("yyyy-MM-dd");
                        response.AdminRequestViewer = result.AdminRequestViewer;
                        response.CreatedAt = result.CreatedAt?.ToString("yyyy-MM-dd");
                        response.UpdatedAt = result.UpdatedAt?.ToString("yyyy-MM-dd");
                        response.LeaveType = result.LeaveType;

                        responses.Add(response);

                    }


                    return responses;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
