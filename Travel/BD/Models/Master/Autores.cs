using System;
using System.Collections.Generic;
using System.Linq;
using Travel.BD.Models.Context;
namespace Travel.BD.Models.Master
{
    //clase que crea la tabla de autores
    public class Autores
    {


        public int id { get; set; }
        public String nombre { get; set; }
        public String apellidos { get; set; }
        public List<Autores> Buscar( )
        {
            BDContextModel BDContext = new BDContextModel();
            var autors = BDContext.Autores.ToList();
            return autors;
        }
        public List<Autores> BuscarCoincidencia(String coincidencia)
        {
            BDContextModel BDContext = new BDContextModel();
            var autors = BDContext.Autores.Where(b => b.nombre.ToUpper().Contains(coincidencia.ToUpper()) || b.apellidos.ToUpper().Contains(coincidencia.ToUpper())).ToList();
            return autors;
        }
        public Autores BuscarUnico(int codigo)
        {
            BDContextModel BDContext = new BDContextModel();
            var autors = BDContext.Autores.Where(b => b.id == codigo).ToList();
            if (autors.Count != 0)
            {
                return autors[0];
            }
            else
            {
                return new Autores
                {
                    id = 0
                };
            }
        }
        public void Crear(Autores autor)
        {
            BDContextModel BDContext = new BDContextModel();
            BDContext.Autores.Add(autor);
            BDContext.SaveChanges();
        }
        public void Actualizar( )
        {
            BDContextModel BDContext = new BDContextModel();
            var autor = BDContext.Autores.Find(this.id);
            autor.apellidos = this.apellidos;
            autor.nombre = this.nombre;
            BDContext.SaveChanges();
        }
        public void Eliminar( )
        {

        }
    }
}
