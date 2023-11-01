using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Common.Configuration
{
    public class AppSettings
    {
        static AppSettings()
        {
            Configuration = new AppSettings();
        }
        public static AppSettings Configuration { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
        public Upload Upload { get; set; }
        public CorsPolicyConfig CorsPolicyConfig { get; set; }
        public AttendanceConfig AttendanceConfig { get; set; }
    }

    public class ConnectionStrings
    {
        public string MerakiEMSDb { get; set; }
  
    }
    public class Upload
    {
        public string Path { get; set; }

    }
    public class CorsPolicyConfig
    {
        public string AllowedOrigin { get; set; }

    }
    public class AttendanceConfig
    {
        public string ArrivalTime { get; set; }

        public int DutyHours { get; set; }
        public string MinLate { get; set; }

    }


}
