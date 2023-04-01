
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Travel.BD.Services.Libro;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Travel.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LibrosReportesApi : ControllerBase
    {
     
        [HttpGet]
        public async Task<IActionResult> Buscar([FromQuery] string llave)
        {
            try
            {


                LibrosReportesServices libros = new LibrosReportesServices();
                List<LibrosReportesServices.librosreporte> Autoreses = libros.Buscar();
                return StatusCode(StatusCodes.Status200OK, Autoreses);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
     
    }
}
