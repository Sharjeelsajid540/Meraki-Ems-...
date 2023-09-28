
using MailKit.Security;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using System.Data;
using MimeKit;
using System.Net.Mail;
using MailKit.Net.Smtp;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Xml.Linq;


namespace MerakiEMS.Application.Services
{
    public class UserAuthenticateService : IUserAuthenticateService
    {
        private readonly IUsersRepository _usersRepository;

        public UserAuthenticateService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        



        //        }
        //        else
        //        {
        //            response.IsRequestSuccessful = false;
        //            response.Errors = new List<string> { { $"User Already Exist!" } };
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsRequestSuccessful = false;
        //        response.Errors = new List<string> { { $"Something went wrong Error:  Please check Message for more details" } };


        //    }
        //        return response;



        //}



       public async Task<AddTicketResponse> AddTicket(Tickets ticket)
        {
            try
            {
                var res = await _usersRepository.AddTicket(ticket);
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
            var response = await _usersRepository.GetAllTickets();
            List<GetTicketResponse> res = new List<GetTicketResponse>();
            if(response != null)
            {
                foreach (var ticket in response)
                {
                    GetTicketResponse item = new GetTicketResponse();
                    item.ID = ticket.ID;
                    item.Title = ticket.Title;
                    item.RequesterName = ticket.RequesterName;
                    item.Reviewer=ticket.Reviewer;
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
            var response = await _usersRepository.GetTickets(id);
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
            var response = await _usersRepository.UpdateTickets(req);
            AddTicketResponse item = new AddTicketResponse();
            if(response != null)
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
        
        public async Task<List<GetUsersResponse>> GetAllUsers()
        {
            var response = await _usersRepository.GetAllUsers();
            return response;
        }
        public async Task<GetUsersResponse> GetUser(int id)
        {
            var response = await _usersRepository.GetUser(id);
            return response;
        }

      
        public async Task<EmailResult> SendLeaveEmail(EmailID email)
        {
            var postt = await _usersRepository.SendLeaveEmail(email);

            if (postt == null)
            {
                return new EmailResult { Success = false, Message = "Email sending failed: User not found." };
            }

            // Construct the subject
            string subject = $"Leave Request for {postt.Description}";

            // Construct the body
            string body = $"<div>Dear {postt.ManagerName},<br></div>";
            body += $"<div><strong>{postt.EmpName}</strong> would like to request leave<br> from <strong>{postt.From:MM-dd-yyyy} to {postt.To:MM-dd-yyyy}</strong>.<br></div>";
            body += "Please review the leave request and let him know if any further information is required.<br>";
            body += $"<div><strong> Meraki IT Support</strong></div>";





            // Send the email using the subject and body
            try
            {
                var emaill = new MimeMessage();
                emaill.From.Add(MailboxAddress.Parse("taybb512@gmail.com"));
                emaill.To.Add(MailboxAddress.Parse(postt.Email)); // Use the manager's email here
                emaill.Subject = subject;
                emaill.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body };

                using (var smtp = new MailKit.Net.Smtp.SmtpClient())
                {
                    smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    smtp.Authenticate("taybb512@gmail.com", "wkuoybrzpqxgyjaw");     
                    smtp.Send(emaill);
                    smtp.Disconnect(true);
                }

                return new EmailResult { Success = true, Message = "Email sent successfully." };
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return new EmailResult { Success = false, Message = "Email sending failed: " + ex.Message };
            }
        }









        public async Task<UpdateUserResponse> UpdateUser(UpdateUserRequest user)
        {
            var response = new UpdateUserResponse();
            try
            {
                var res = await _usersRepository.UpdateUser(user);
                if (res == null)
                {
                    response.SuccessMessage = "Invalid User ID!";

                }
                else
                {
                    response.IsSuccess = true;
                    response.SuccessMessage = "User Updated Successfully";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.SuccessMessage += ex.Message;

            }
            return response;

        }

        

        public async Task<ApiResponse<string>> RequestLeave(LeaveRequest lev)
        {
            var response = new ApiResponse<string>();
            if (lev == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "User fields can not be empty!";
            }
            else
            {
                var postt = await _usersRepository.RequestLeave(lev);
                if (postt == null)
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "User Already Exists!";

                }
                else
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "User added successfully";
                }

            }

            return response;

        }

    




        public async Task<ApiResponse<string>> AddUser(AddEmployeeRequest req)
        {
            var response = new ApiResponse<string>();
            if (req == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "User fields can not be empty!";
            }
            else
            {
                var postt = await _usersRepository.InsertUser(req);
                if (postt == null) {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "User Already Exists!";

                }
                else
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "User added successfully";
                }

            }

            return response;

        }

        public async Task<UpdateUserResponse> DeleteUser(int id)
        {
            var response = new UpdateUserResponse();
            try
            {
                var res = await _usersRepository.DeleteUser(id);
                if (res == null)
                {
                    response.SuccessMessage = "Invalid User ID!";

                }
                else
                {
                    response.IsSuccess = true;
                    response.SuccessMessage = "User Deleted Successfully";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.SuccessMessage += ex.Message;

            }
            return response;

        }

        



        public async Task<List<Role>> GetRoleList()
        {
            var response = await _usersRepository.RoleList();
            return response;
        }
        public async Task<List<AttendanceListResponse>> GetAttendanceList()
        {
            List<AttendanceListResponse> responses = new List<AttendanceListResponse>();

            var res = await _usersRepository.AttendanceList();
            if (res == null)
            {
                return null;
            }
            else
            {

                foreach (var result in res)
                {
                    var response = new AttendanceListResponse();
                    response.Name = result.Name;
                    response.ID = result.ID;
                    response.UserID = result.UserID;
                    response.CheckInTime = result.CheckInTime?.ToString("HH:mm:ss");
                    response.CreatedAt = result.CreatedAt?.ToString("MM-dd-yyyy");
                    response.CheckOutTime = result.CheckOutTime?.ToString("HH:mm:ss");
                    response.WorkingHours = result.WorkingHours?.ToString(@"hh\:mm\:ss");
                    responses.Add(response);

                }
                return responses;

            }
        }

           public async Task<List<LeaveResponse>> GetAllLeaves(UserID user)
        {
        
                List<LeaveResponse> responses = new List<LeaveResponse>();
                var res = await _usersRepository.GetAllLeaves(user);
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

          
        

        public async Task<List<LeaveResponse>> GetLeave()
    { List<LeaveResponse> responses = new List<LeaveResponse>();
        try
        {
            var res = await _usersRepository.GetLeave();
            if (res == null)
            {
                return null;
            }
            else
            {

                foreach (var result in res)
                {
                    var response = new LeaveResponse();
                    response.ID=result.ID;
                    response.Name=result.Name;
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
        catch (Exception ex)
        {
            throw ex;
        }

    }




        
        public async Task<List<AttendanceListResponse>> GetSingleAttendanceList(UserAttendanceRequest req)
        {
            var res = await _usersRepository.SingleAttendanceList(req);

            List<AttendanceListResponse> responses = new List<AttendanceListResponse>();
            if (res == null)
            {
                return null;
            }
            else
            {

                foreach (var result in res)
                {
                    var response = new AttendanceListResponse();
                    response.Name = result.Name;
                    response.ID = result.ID;
                    response.UserID = result.UserID;
                    response.CheckInTime = result.CheckInTime?.ToString("HH:mm:ss");
                    response.CreatedAt = result.CreatedAt?.ToString("MM-dd-yyyy");
                    response.CheckOutTime = result.CheckOutTime?.ToString("HH:mm:ss");
                    response.WorkingHours = result.WorkingHours?.ToString(@"hh\:mm\:ss");
                    responses.Add(response);

                }
                return responses;

            }
        }

        public async Task<LoginResponse>LoginUser(LoginRequest request)
        {
            LoginResponse response = new LoginResponse();
            try
            {
                User entityUser = new();
                {
                    entityUser.Name = request.Name;
                    entityUser.Password = request.Password;
                }
                var res = await _usersRepository.CheckLogin(entityUser);
                if (res != null) {
                    var token = _usersRepository.GenerateToken(res);
                    res.IsSuccess = true;
                    res.Message = "Login Successfull";
                    
                    res.Token = token.Result;

                    return res;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Errors = new List<string> { { "Invalid Name or password! Please try again" } };
                }
            }
                catch(Exception ex)
            {
                    
                response.IsSuccess = false;
                response.Errors = new List<string> { { $"Something went wrong Error:  Please check Message for more details" } };

            }
            return response;
        }
        public async Task<CheckInResponse> InsertAttendance(CheckInRequest req)
        {
            CheckInResponse response = new CheckInResponse();
            var res = await _usersRepository.InsertAttendance(req);
            if (res != null)
            {
                if(res.SuccessMessage == "Already CheckedIN!")
                {
                    response.SuccessMessage = res.SuccessMessage;
                    response.IsRequestSuccessfull = "false";
                    response.AttendanceID = res.AttendanceID;
                    
                }
                else
                {
                    response.AttendanceID = res.AttendanceID;
                    response.SuccessMessage = "CheckIn Successfull";
                    response.IsRequestSuccessfull = "true";
                }
               
            }
            else
            {
                response.IsRequestSuccessfull = "false";
                response.SuccessMessage = "Already CheckedIn!";
                response.Errors = new List<string> { "Something Went wrong" };
            }
            return response;
        }


        public async Task<AdminLeaveResponse> AdminLeaveRequest(AdminRequest req)
        {
            AdminLeaveResponse response = new AdminLeaveResponse();
            try
            {
                var res = await _usersRepository.AdminLeaveRequest(req);
                if (res != null)
                {
                    response.SuccessMessage = "CheckOut Successfull";
                    response.IsRequestSuccessfull = "true";

                }
                else
                {
                    response.IsRequestSuccessfull = "false";
                    response.SuccessMessage = "CheckOut Failed!";
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



        public async Task<CheckoutResponse> UpdateAttendance(CheckOutRequest req)
        {
            CheckoutResponse response = new CheckoutResponse();
            try
            {
                var res = await _usersRepository.EditAttendance(req);
                if (res != null)
                {
                    response.SuccessMessage = "CheckOut Successfull";
                    response.IsRequestSuccessfull = "true";

                }
                else
                {
                    response.IsRequestSuccessfull = "false";
                    response.SuccessMessage = "Already CheckedOut!";
                }
                return response;
            }
            catch(Exception ex) 
            {
                response.IsRequestSuccessfull = "false";
                response.Errors = new List<string> {  ex.Message };
                return response;

            }
            
            
        }

        public async Task<List<ManagerListResponse>> GetManagerList()
        {
            var response = await _usersRepository.MangerList();
            return response;
        }
    }
}