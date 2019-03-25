using MODEL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JqueryAutoComplete.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult GetEmployee()
        {
            string json = "";
            string path = AppDomain.CurrentDomain.BaseDirectory + "/JsonData/";
            using (StreamReader r = new StreamReader(Path.Combine(path, "employee-list.json")))
            {
                json = r.ReadToEnd();
            }
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(List<EMPLOYEE> EMPLOYEE_LIST)
        {
            var responseResult = JsonConvert.SerializeObject(EMPLOYEE_LIST, Formatting.Indented,
                     new JsonSerializerSettings
                     {
                         ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                     });

            return Json(responseResult, JsonRequestBehavior.AllowGet);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}