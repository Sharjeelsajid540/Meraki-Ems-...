using MailKit.Net.Smtp;
using MailKit.Security;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using MerakiEMS.Infrastructure.Persistence.Sql.Repositories;
using Microsoft.EntityFrameworkCore;
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
        public async Task<EmailResult> SendLeaveEmail(LeaveRequest req)
        {
            try
            {
                var postt = await _leavesRepository.SendLeaveEmail(req.UserID);

                if (req == null)
                {
                    return new EmailResult { Success = false, Message = "Email sending failed: User not found." };
                }
                string bodyTemplate =
                 "<html>" +
                 "<head>" +
                 "<style>" +
                 "  body { font-family: 'Arial', sans-serif; }" +
                 "  .container { max-width: 600px; margin: 0 auto; }" +
                 "  .header { background-color: #020322; color: #fff; padding: 10px; text-align: center; display: flex; align-items: center; height: 57px; border-radius: 8px; }" +
                 "  .header img { margin-right: 10px; }" +
                 "  .header h2 { margin: 0; }" +
                 "  .header .heading { padding: 13px 0px; width: 80%; }" +
                 "  .content { padding: 20px; text-align: left; }" +
                 "  .leave-info { display: flex; justify-content: space-between; align-items: flex-start; }" +
                 "  .leave-info p { margin: 0; }" +  // Ensuring no extra margin in leave-info paragraphs
                 "  .leave-info .leave-count { text-align: right; width: 100%; margin-top: 5px; }" +  // Aligning leave count to the right on a new line
                 "  .signature { margin-top: 20px; text-align: right; }" +
                 "  .footer { background-color: #020322; color: #fff; padding: 10px; text-align: center; margin-top: 30px; border-radius: 8px; }" +
                 "</style>" +
                 "</head>" +
                 "<body>" +
                 "<div class='container'>" +
                 "  <div class='header'>" +
                 "    <img src='https://i.ibb.co/WsDj2zf/logo1-removebg-preview.png' alt='Company Logo' width='75px'>" +
                 "    <div class='heading'>" +
                 "      <h2>Leave Request</h2>" +
                 "    </div>" +
                 "  </div>" +
                 "  <div class='content'>" +
                 "    <div class='leave-info'>" +
                 "      <p>Hi,</p>" +
                 "      <p class='leave-count'><strong>" + postt.LeaveCount + "</strong> Leaves </p>" +  // Moving leave count to the right on a new line
                 "    </div>" +
                 $"    <p><strong>{postt.EmpName}</strong> would like to request for <strong>{req.LeaveType} </strong> leave from  <strong>{req.From:MM-dd-yyyy}</strong> to <strong>{req.To:MM-dd-yyyy}</strong> .</p>" +
                 $"    <p>{req.Description}</p>" +
                 "    <p>Please review the leave request and let them know if any further information is required.</p>" +
                 "  </div>" +
                 "  <div class='signature'>" +
                 "    <p><strong>Meraki IT Support</strong></p>" +
                 "  </div>" +
                 "  <div class='footer'>" +
                 "    <p>© 2024 Meraki IT Solution. All rights reserved.</p>" +
                 "  </div>" +
                 "</div>" +
                 "</body>" +
                 "</html>";




                // Iterate through the list of email addresses and send individual emails
                foreach (var recipientEmail in postt.Emails)
                {
                    // Create a unique subject for each email
                    string subject = $"Leave Request {postt.EmpName}";

                    try
                    {
                        if (!IsValidEmail(recipientEmail))
                        {
                            // Skip invalid email addresses
                            continue;
                        }

                        var emaill = new MimeMessage();
                    emaill.From.Add(MailboxAddress.Parse("merakiservice540@gmail.com"));
                        emaill.To.Add(MailboxAddress.Parse(recipientEmail)); // Use the recipient's email here
                        emaill.Subject = subject;
                        emaill.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = bodyTemplate };

                        using (var smtp = new MailKit.Net.Smtp.SmtpClient())
                        {
                            await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                            await smtp.AuthenticateAsync("merakiservice540@gmail.com", "qomn hnqf llvp cgrf");
                            await smtp.SendAsync(emaill);
                            await smtp.DisconnectAsync(true);
                        }
                    }
                    catch (SmtpCommandException ex)
                    {
                        // Handle SmtpCommandException
                        return new EmailResult { Success = false, Message = $"Email sending failed to {recipientEmail}: {ex.Message}" };
                    }
                    catch (Exception ex)
                    {
                        // Log the exception or handle it as needed
                        return new EmailResult { Success = false, Message = $"Email sending failed to {recipientEmail}: {ex.Message}" };
                    }
                }

                return new EmailResult { Success = true, Message = "Emails sent successfully." };
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return new EmailResult { Success = false, Message = $"Email sending failed: {ex.Message}" };
            }
        }


        public bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
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
                    var sendEmail = await SendLeaveEmail(req);

                }

            }

            return response;

        }
        public async Task<List<LeaveResponse>> GetLeave(UserID user)
        {
            var res = await _leavesRepository.GetLeave(user);

            if (res == null || !res.Any())
            {
                return null;
            }

            var responses = res.Select(result => new LeaveResponse
            {
                ID = result.ID,
                Name = result.Name,
                UserID = result.UserID,
                Status = result.Status,
                Comments = result.Comments,
                Description = result.Description,
                From = result.From?.ToString("yyyy-MM-dd"),
                To = result.To?.ToString("yyyy-MM-dd"),
                AdminRequestViewer = result.AdminRequestViewer,
                CreatedAt = result.CreatedAt?.ToString("yyyy-MM-dd"),
                UpdatedAt = result.UpdatedAt?.ToString("yyyy-MM-dd")
            }).ToList();

            return responses;
        }
        public async Task<AdminLeaveResponse> AdminLeaveRequest(AdminRequest req)
        {
            AdminLeaveResponse response = new AdminLeaveResponse();
            try
            {
                var res = await _leavesRepository.AdminLeaveRequest(req);

                if (res != null)
                {

               
                    await SendLeaveStatusUpdateEmail(res.UserID, res);

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
         public async Task<List<LeaveResponse>> GetAllLeave(bool isLeaveFilter, string Name, string Status)
        {
            List<LeaveResponse> responses = new List<LeaveResponse>();
            try
            {
                var res = await _leavesRepository.GetAllLeave(isLeaveFilter,Name, Status);
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
        public async Task<bool> SendLeaveStatusUpdateEmail(int userId,Leave leave)
        {
            try
            { 
                var user = await _leavesRepository.GetUserById(userId);

                if (user == null)
                {
                    // Log or handle the scenario where the user is not found
                    return false;
                }
                // Construct the body template
                string bodyTemplate =
          "<html>" +
          "<head>" +
          "<style>" +
          "  body { font-family: 'Arial', sans-serif; }" +
          "  .container { max-width: 600px; margin: 0 auto; }" +
          "  .header { background-color: #020322; color: #fff; padding: 10px; text-align: center; display: flex; align-items: center; height: 57px;border-radius: 8px; }" +
          "  .header img { margin-right: 10px; }" +
          "  .header h2 { margin: 0; }" +
          "  .header .heading  { padding: 13px 0px; width: 80%; }" +
          "  .content { padding: 20px; text-align: left; }" +
          "  .signature { margin-top: 20px; text-align: right; }" +
          "  .footer {  background-color: #020322; color: #fff; padding: 10px; text-align: center; margin-top: 30px;border-radius: 8px; }" +
          "  .text-red {color: red}" +
          "  .text-green {color: green}" +
          "</style>" +
          "</head>" +
          "<body>" +
          "<div class='container'>" +
          "  <div class='header'>" +
          "    <img src='https://i.ibb.co/WsDj2zf/logo1-removebg-preview.png' alt='Company Logo' width='75px'>" +
          "    <div class='heading'>" +
          "      <h2>Leave Request</h2>" +
          "    </div>" +
          "  </div>" +
          "  <div class='content'>" +
          $"    <p>{leave.Name},</p>" +
          $"<div>The Status of Your {leave.LeaveType} Leave has been updated to <strong {(leave.Status == "Approved"? "class='text-green'" : "class='text-red'")}>{leave.Status}</strong>.<br></div>" +
          $"Details:<br>" +

                $"<div><strong>From:</strong> {leave.From:MM-dd-yyyy}<br></div>" +
                $"<div><strong>To:</strong> {leave.To:MM-dd-yyyy}<br></div>" +
                $"<div><strong>Comments:</strong> {leave.Comments}<br></div>" +

                "  </div>" +
                "  <div class='signature'>" +
                "    <p><strong>Meraki IT Support</strong></p>" +
                "  </div>" +
                "  <div class='footer'>" +
                "    <p>© 2024 Meraki IT Solution. All rights reserved.</p>" +
                "  </div>" +
                "</div>" +
                "</body>" +
                "</html>";



                
                // Send email logic
                string subject = $"Leave Status Update - {leave.Name}";

                var emailMessage = new MimeMessage();
                emailMessage.From.Add(MailboxAddress.Parse("merakiservice540@gmail.com"));
                emailMessage.To.Add(MailboxAddress.Parse(user.Email)); // Use the recipient's email here
                emailMessage.Subject = subject;
                emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = bodyTemplate };

                using (var smtp = new MailKit.Net.Smtp.SmtpClient())
                {
                    smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    smtp.Authenticate("merakiservice540@gmail.com", "qomn hnqf llvp cgrf");
                    smtp.Send(emailMessage);
                    smtp.Disconnect(true);
                }

                return true; // Email sent successfully
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return false;
            }
        }



        public async Task<UpdateUserResponse> Deleteleave(int id)
        {
            var response = new UpdateUserResponse();

            try
            {
                var leaveToDelete = await _leavesRepository.GetUserByID(id);

                if (leaveToDelete == null)
                {
                    response.ErrorMessage = "Leave with the provided ID not found.";
                    return response;
                }

                if (leaveToDelete.Status != "Pending")
                {
                    response.IsRequestSuccessful = false;
                    response.ErrorMessage = "Cannot delete an approved or rejected leave.";
                    return response;
                }

                // Proceed with deletion
                var deletionMessage = await _leavesRepository.Deleteleave(leaveToDelete);

                response.IsRequestSuccessful = true;
                response.SuccessMessage = "Leave deleted successfully: " + deletionMessage;
            }
            catch (Exception ex)
            {
                response.IsRequestSuccessful = false;
                response.ErrorMessage = $"An error occurred: {ex.Message}";
            }

            return response;
        }
    }

}



