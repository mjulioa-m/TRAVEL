
using Travel.BD.Services.Autor;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;

namespace Travel.Controllers
{
    //[EnableCors("AllowAnyOrigin")]
    [Route("[controller]")]
    [ApiController]
    public class Autoresapi : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Guardar(Autores Autores)
        {
            try
            {

                AutoresService autores = new AutoresService();
                autores.Crear(Autores);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }


        }

        [HttpGet]
        public async Task<IActionResult> Buscar([FromQuery] string llave)
        {
            try
            {


                AutoresService autores = new AutoresService();
                List<Autores> Autoreses = autores.Buscar();
                return StatusCode(StatusCodes.Status200OK, Autoreses);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
        [HttpGet("nombres")]
        public async Task<IActionResult> BuscarparaModulos([FromQuery] string llave)
        {
            try
            {


                AutoresService autores = new AutoresService();
                List<Autores> Autoreses = autores.Buscar();
                return StatusCode(StatusCodes.Status200OK, Autoreses);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
        [HttpGet("{coincidencia}")]
        public async Task<IActionResult> BuscarCoincidencias(String coincidencia)
        {
            try
            {

                AutoresService autores = new AutoresService();
                List<Autores> Autoreses = autores.BuscarCoincidencias(coincidencia);
                return StatusCode(StatusCodes.Status200OK, Autoreses);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpGet("unico/{codigo}")]
        public async Task<IActionResult> BuscarUnico(int codigo)
        {

            try
            {



                AutoresService autores = new AutoresService();
                Autores Autoress = autores.BuscarUnico(codigo);
                return StatusCode(StatusCodes.Status200OK, Autoress);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }

        }
        [HttpPut]
        public async Task<IActionResult> Actualizar(Autores Autores)
        {
            try
            {

                AutoresService autores = new AutoresService();
                autores.Actualizar(Autores);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
        [HttpDelete]
        public async Task<IActionResult> Eliminar(Autores Autores)
        {
            try
            {


                AutoresService autores = new AutoresService();
                autores.Eliminar(Autores);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
    }
}
