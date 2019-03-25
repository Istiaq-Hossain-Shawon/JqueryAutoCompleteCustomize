using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public partial class EMPLOYEE
    {
        public string EMPLOYEE_ID { set; get; }
        public string EMPLOYEE_NAME { set; get; }
        public string EMP_DESG_NAME { set; get; }
        public string EMP_BRANCH_NAME { set; get; }
        public string EMP_DEPT_NAME { set; get; }
        public int PRESENT_DESG_REPORTORDER { set; get; }
        public string EMP_RANK { set; get; }
    }
    
}
