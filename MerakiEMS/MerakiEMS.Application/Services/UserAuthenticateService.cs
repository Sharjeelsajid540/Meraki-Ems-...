
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;



namespace MerakiEMS.Application.Services
{
    public class UserAuthenticateService : IUserAuthenticateService
    {
        private readonly IUsersRepository _usersRepository;

        public UserAuthenticateService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        //public async Task<ApiResponse<string>>AuthenticateUser(RegisterRequest request)
        //{
        //    var response = new ApiResponse<string>();
        //    try
        //    {
        //        Users entityUser = new();
        //        {
        //            entityUser.Email = request.Email;
        //            entityUser.Password = request.Password;
        //            entityUser.Username = request.Username;
        //            entityUser.IsActive = true;
        //        }
        //        var res = await _usersRepository.CheckUser(entityUser);

        //        if (res != null)
        //        {
        //            var token = await _usersRepository.GenerateToken(res);
        //            response.IsRequestSuccessful = true;
        //            response.SuccessResponse = "User Registered Successfully";
        //            response.Token = token;



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




        public async Task<List<GetUsersResponse>> GetUsers()
        {
            var response = await _usersRepository.GetAllUsers();
            return response;
        }


        public async Task<List<Leave>> GetAllLeaves(int id)
        {
            try
            {
                var response = await _usersRepository.GetAllLeaves(id);
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<UpdateUserResponse> UpdateUser(User user)
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
    }
}