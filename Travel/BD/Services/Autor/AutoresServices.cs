using Travel.BD.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Microsoft.AspNetCore.Mvc;
namespace Travel.BD.Services.Autor
{
    //clase encargada de la informacion de la tabla autores

    public class AutoresService
    {
        public void Crear( Autores autores)
        {
            autores.Crear(autores);
        }
        public List<Autores> Buscar()
        {
            Autores autores = new Autores();
            return autores.Buscar();
        }
        public void Actualizar( Autores autores)
        {
            autores.Actualizar();
        }
        public List<Autores> BuscarCoincidencias( String coincidencia)
        {
            Autores autores = new Autores();
            return autores.BuscarCoincidencia(coincidencia);
        }
        public Autores BuscarUnico( int autores)
        {
            return new Autores().BuscarUnico(autores);
        }
        public void Eliminar( Autores autores)
        {
            autores.Eliminar();
        }
    }
}
