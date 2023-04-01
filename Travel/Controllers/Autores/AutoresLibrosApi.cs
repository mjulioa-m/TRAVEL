using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Join;
using Travel.BD.Models.Master;
using Travel.BD.Services.Autor;
using Travel.BD.Services.Libro;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Travel.Controllers.Autor
{
    [Route("[controller]")]
    [ApiController]
    public class AutoresLibrosApi : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Guardar(List<autores_has_libros> autores_has_libros)
        {
            var mensaje = new Mensajes
            {
                status = "500",
                mensaje = ""
            };
            try
            {
                if (autores_has_libros.Count>0)
                {
                    autores_has_libros[0].Eliminar();
                }
                foreach (var item in autores_has_libros)
                {
                    AutoresLibrosServices libros = new AutoresLibrosServices();
                    libros.Crear(item);
                }
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


                AutoresLibrosServices libros = new AutoresLibrosServices();
                List<autores_has_libros> Autoreses = libros.Buscar();
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


                AutoresLibrosServices libros = new AutoresLibrosServices();
                List<autores_has_libros> Autoreses = libros.Buscar();
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

                AutoresLibrosServices libros = new AutoresLibrosServices();
                List<autores_has_libros> Autoreses = libros.BuscarCoincidencias(coincidencia);
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



                AutoresLibrosServices libros = new AutoresLibrosServices();
                autores_has_libros Autoress = libros.BuscarUnico(codigo);
                return StatusCode(StatusCodes.Status200OK, Autoress);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }

        }
        [HttpPut]
        public async Task<IActionResult> Actualizar(autores_has_libros autores_has_libros)
        {
            try
            {

                AutoresLibrosServices libros = new AutoresLibrosServices();
                libros.Actualizar(autores_has_libros);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
        [HttpDelete]
        public async Task<IActionResult> Eliminar(autores_has_libros autores_has_libros)
        {
            try
            {


                AutoresLibrosServices libros = new AutoresLibrosServices();
                libros.Eliminar(autores_has_libros);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
    }
}
