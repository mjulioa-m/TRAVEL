
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
    public class LibrosApi : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Guardar(Libros Libros)
        {
            var mensaje = new Mensajes
            {
                status = "500",
                mensaje = ""
            };
            try
            {

                LibrosServices libros = new LibrosServices();
                libros.Crear(Libros);
                mensaje.status = "200";
                mensaje.mensaje = "Libro creado exitosamente";
                return StatusCode(StatusCodes.Status200OK, mensaje);

            }
            catch (Exception ex)
            {
                mensaje.mensaje = "Error al crear el libro: " + ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, mensaje);
            }


        }

        [HttpGet]
        public async Task<IActionResult> Buscar([FromQuery] string llave)
        {
            try
            {


                LibrosServices libros = new LibrosServices();
                List<Libros> Autoreses = libros.Buscar();
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


                LibrosServices libros = new LibrosServices();
                List<Libros> Autoreses = libros.Buscar();
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

                LibrosServices libros = new LibrosServices();
                List<Libros> Autoreses = libros.BuscarCoincidencias(coincidencia);
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



                LibrosServices libros = new LibrosServices();
                Libros Autoress = libros.BuscarUnico(codigo);
                return StatusCode(StatusCodes.Status200OK, Autoress);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }

        }
        [HttpPut]
        public async Task<IActionResult> Actualizar(Libros Libros)
        {
            try
            {

                LibrosServices libros = new LibrosServices();
                libros.Actualizar(Libros);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
        [HttpDelete]
        public async Task<IActionResult> Eliminar(Libros Libros)
        {
            try
            {


                LibrosServices libros = new LibrosServices();
                libros.Eliminar(Libros);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
    }
}
