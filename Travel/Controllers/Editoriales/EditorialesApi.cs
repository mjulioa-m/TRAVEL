
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Travel.BD.Services.Editorial;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Travel.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EditorialesApi : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Guardar(Editoriales Editoriales)
        {
            try
            {

                EditorialesServices editoriales = new EditorialesServices();
                editoriales.Crear(Editoriales);
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


                EditorialesServices editoriales = new EditorialesServices();
                List<Editoriales> Autoreses = editoriales.Buscar();
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


                EditorialesServices editoriales = new EditorialesServices();
                List<Editoriales> Autoreses = editoriales.Buscar();
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

                EditorialesServices editoriales = new EditorialesServices();
                List<Editoriales> Autoreses = editoriales.BuscarCoincidencias(coincidencia);
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



                EditorialesServices editoriales = new EditorialesServices();
                Editoriales Autoress = editoriales.BuscarUnico(codigo);
                return StatusCode(StatusCodes.Status200OK, Autoress);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }

        }
        [HttpPut]
        public async Task<IActionResult> Actualizar(Editoriales Editoriales)
        {
            try
            {

                EditorialesServices editoriales = new EditorialesServices();
                editoriales.Actualizar(Editoriales);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
        [HttpDelete]
        public async Task<IActionResult> Eliminar(Editoriales Editoriales)
        {
            try
            {


                EditorialesServices editoriales = new EditorialesServices();
                editoriales.Eliminar(Editoriales);
                return StatusCode(StatusCodes.Status200OK, "");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
    }
}
