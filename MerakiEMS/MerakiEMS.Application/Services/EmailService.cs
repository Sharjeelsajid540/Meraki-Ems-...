using MerakiEMS.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using MailKit.Security;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MimeKit;

namespace MerakiEMS.Application.Services
{
    public class EmailService : IEmailService
    {


        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
      

        public EmailService(string smtpServer, int smtpPort, string smtpUsername, string smtpPassword)
        {
            _smtpServer = smtpServer;
            _smtpPort = smtpPort;
            _smtpUsername = smtpUsername;
            _smtpPassword = smtpPassword;
        }
        public async Task SendPasswordResetEmailAsync(string email, string resetToken)
        {
            var fromAddress = new MailAddress("sgarjeelsajid1998@gmail.com", "sharjeel sajid");
            var toAddress = new MailAddress(email, "sharjeel sajid");
          
            try
            {
               

               
                var emailMessage = new MimeMessage();
                emailMessage.From.Add(MailboxAddress.Parse("merakiservice540@gmail.com"));
                emailMessage.To.Add(MailboxAddress.Parse(email));
                emailMessage.Subject = "Password Reset";

                // Updated HTML template
                emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = "<html>" +
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
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "  <div class='header'>" +
                    "    <img src='https://i.ibb.co/WsDj2zf/logo1-removebg-preview.png' alt='Company Logo' width='75px'>" +
                    "    <div class='heading'>" +
                    "      <h2>Reset Password Request</h2>" +
                    "    </div>" +
                    "  </div>" +
                    "  <div class='content'>" +
                    $"    <p>Hi,</p>" +
                    $"    <p>You have requested to reset your password. Please click the following button to reset it:</p>" +
                    $"    <a href='http://www.meraki-ams.local/reset?token={resetToken}'>Reset Password</a>" +
                    "  </div>" +
                    "  <div class='signature'>" +
                    "    <p><strong>Meraki IT Support</strong></p>" +
                    "  </div>" +
                    "  <div class='footer'>" +
                    "    <p>© 2024 Meraki IT Solution. All rights reserved.</p>" +
                    "  </div>" +
                    "</div>" +
                    "</body>" +
                    "</html>"
                };

                using (var smtp = new MailKit.Net.Smtp.SmtpClient())
                {
                    smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    smtp.Authenticate("merakiservice540@gmail.com", "qomn hnqf llvp cgrf");
                    smtp.Send(emailMessage);
                    smtp.Disconnect(true);
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately, e.g., log them
            }
        }
    }



    
}

    

