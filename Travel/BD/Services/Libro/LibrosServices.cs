using Travel.BD.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Microsoft.AspNetCore.Mvc;
namespace Travel.BD.Services.Libro
{
    //clase encargada de la informacion de la tabla libros

    public class LibrosServices
    {


        public void Crear(Libros libros)
        {
            libros.Crear(libros);
        }
        public List<Libros> Buscar()
        {
            Libros libros = new Libros();
            return libros.Buscar();
        }
        public void Actualizar(Libros libros)
        {
            libros.Actualizar();
        }
        public List<Libros> BuscarCoincidencias(String coincidencia)
        {
            Libros libros = new Libros();
            return libros.BuscarCoincidencia(coincidencia);
        }
        public Libros BuscarUnico(int libros)
        {
            return new Libros().BuscarUnico(libros);
        }
        public void Eliminar(Libros libros)
        {
            libros.Eliminar();
        }
    }
}
