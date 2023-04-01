
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Travel.BD.Services.Autor;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Travel.Controllers.Autor
{
    [Route("[controller]")]
    [ApiController]
    public class AutoresLibrosReportesApi : ControllerBase
    {


        [HttpGet]
        public async Task<IActionResult> Buscar()
        {
            try
            {


                AutoresLibrosReportesServices libros = new AutoresLibrosReportesServices();
                List<AutoresLibrosReportesServices.autoreslibros> Autoreses = libros.Buscar();
                return StatusCode(StatusCodes.Status200OK, Autoreses);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
        [HttpGet("cantidad")]
        public async Task<IActionResult> BuscarCantidadLibros()
        {
            try
            {


                AutoresLibrosReportesServices libros = new AutoresLibrosReportesServices();
                List<AutoresLibrosReportesServices.autorescantidadeslibros> Autoreses = libros.BuscarCantidades();
                return StatusCode(StatusCodes.Status200OK, Autoreses);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
    }
}
