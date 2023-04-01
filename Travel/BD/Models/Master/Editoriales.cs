using System;
using System.Collections.Generic;
using System.Linq;
using Travel.BD.Models.Context;

namespace Travel.BD.Models.Master
{
    //clase que crea la tabla de editoriales

    public class Editoriales
    {


        public int id { get; set; }
        public String nombre { get; set; }
        public String sede { get; set; }
        public Libros Libros { get; set; }
        public List<Editoriales> Buscar()
        {
            BDContextModel BDContext = new BDContextModel();
            var editoriales = BDContext.Editoriales.ToList();
            return editoriales;
        }
        public List<Editoriales> BuscarCoincidencia(String coincidencia)
        {
            BDContextModel BDContext = new BDContextModel();
            var editoriales = BDContext.Editoriales.Where(b => b.nombre.ToUpper().Contains(coincidencia.ToUpper()) || b.sede.ToUpper().Contains(coincidencia.ToUpper())).ToList();
            return editoriales;
        }
        public Editoriales BuscarUnico(int codigo)
        {
            BDContextModel BDContext = new BDContextModel();
            var editoriales = BDContext.Editoriales.Where(b => b.id == codigo).ToList();
            if (editoriales.Count != 0)
            {
                return editoriales[0];
            }
            else
            {
                return new Editoriales
                {
                    id = 0
                };
            }
        }
        public void Crear(Editoriales autor)
        {
            BDContextModel BDContext = new BDContextModel();
            BDContext.Editoriales.Add(autor);
            BDContext.SaveChanges();
        }
        public void Actualizar()
        {
            BDContextModel BDContext = new BDContextModel();
            var autor = BDContext.Editoriales.Find(this.id);
            autor.sede = this.sede;
            autor.nombre = this.nombre;
            BDContext.SaveChanges();
        }
        public void Eliminar()
        {

        }
    }
}
