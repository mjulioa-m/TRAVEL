using Travel.BD.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Travel.BD.Models.Join;
using Microsoft.AspNetCore.Mvc;
namespace Travel.BD.Services.Autor
{
    //clase encargada de la informacion de la tabla autores_has_libros
    public class AutoresLibrosServices
    {

        public void Crear(autores_has_libros autoreslibros)
        {
            autoreslibros.Crear(autoreslibros);
        }
        public List<autores_has_libros> Buscar()
        {
            autores_has_libros autoreslibros = new autores_has_libros();
            return autoreslibros.Buscar();
        }
        public void Actualizar(autores_has_libros autoreslibros)
        {
            autoreslibros.Actualizar();
        }
        public List<autores_has_libros> BuscarCoincidencias(String coincidencia)
        {
            autores_has_libros autoreslibros = new autores_has_libros();
            return autoreslibros.BuscarCoincidencia(coincidencia);
        }
        public autores_has_libros BuscarUnico(int autoreslibros)
        {
            return new autores_has_libros().BuscarUnico(autoreslibros);
        }
        public void Eliminar(autores_has_libros autoreslibros)
        {
            autoreslibros.Eliminar();
        }
    }
}
