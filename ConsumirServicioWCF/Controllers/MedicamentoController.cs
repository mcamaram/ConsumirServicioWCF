using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ConsumirServicioWCF.ServiceMedicamento;

namespace ConsumirServicioWCF.Controllers
{
    public class MedicamentoController : Controller
    {
        // GET: Medicamento
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ListarMedicamentos()
        {
            MedicamentosClient oMedicamentosClient = new MedicamentosClient();
            var lista = oMedicamentosClient.listarMedicamentos();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListarFormaFarmaceutica()
        {
            MedicamentosClient oMedicamentosClient = new MedicamentosClient();
            var lista = oMedicamentosClient.listarFormaFarmaceutica()
                .Select(p => new
                {
                    p.iidformafarmaceutica,
                    p.nombreFormaFarmaceutica
                }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RecuperarMedicamento(int iidMedicamento)
        {
            MedicamentosClient oMedicamentosClient = new MedicamentosClient();

            var medicamento = oMedicamentosClient.recuperarMedicamento(iidMedicamento);

            return Json(medicamento, JsonRequestBehavior.AllowGet);
        }
        public int GuardarMedicamento(MedicamentoCLS oMedicamentoCLS)
        {
            int rpta = 0;
            try
            {
                MedicamentosClient oMedicamentosClient = new MedicamentosClient();
                rpta = oMedicamentosClient.registrarYactualizarMedicamento(oMedicamentoCLS);
            }
            catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }
        public int EliminarMedicamento(int iidMedicamento)
        {
            int rpta = 0;
            try
            {
                MedicamentosClient oMedicamentosClient = new MedicamentosClient();
                rpta = oMedicamentosClient.eliminarMedicamento(iidMedicamento);
            }
            catch(Exception ex)
            {
                rpta = 0;
            }
            return rpta;
        }
    }
}