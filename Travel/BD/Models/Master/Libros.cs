using System;
using System.Collections.Generic;
using System.Linq;
using Travel.BD.Models.Context;

namespace Travel.BD.Models.Master
{
    //clase que crea la tabla de libros

    public class Libros
    {
        public int ISBN { get; set; }
        public int editoriales_id { get; set; }
        public String titulo { get; set; }
        public String sipnosis { get; set; }
        public String n_paginas { get; set; }
        public Editoriales Editoriales { get; set; }
        public List<Libros> Buscar()
        {
            BDContextModel BDContext = new BDContextModel();
            var libros = BDContext.Libros.ToList();
            return libros;
        }
        public List<Libros> BuscarCoincidencia(String coincidencia)
        {
            BDContextModel BDContext = new BDContextModel();
            var libros = BDContext.Libros.Where(b => b.titulo.ToUpper().Contains(coincidencia.ToUpper()) || b.ISBN.ToString().ToUpper().Contains(coincidencia.ToUpper())).ToList();
            return libros;
        }
        public Libros BuscarUnico(int codigo)
        {
            BDContextModel BDContext = new BDContextModel();
            var libros = BDContext.Libros.Where(b => b.ISBN == codigo).ToList();
            if (libros.Count != 0)
            {
                return libros[0];
            }
            else
            {
                return new Libros
                {
                    ISBN = 0
                };
            }
        }
        public void Crear(Libros autor)
        {
            BDContextModel BDContext = new BDContextModel();
            BDContext.Libros.Add(autor);
            BDContext.SaveChanges();
        }
        public void Actualizar()
        {
            BDContextModel BDContext = new BDContextModel();
            var autor = BDContext.Libros.Find(this.ISBN);
            autor.titulo = this.titulo;
            autor.sipnosis = this.sipnosis;
            autor.n_paginas = this.n_paginas;
            autor.editoriales_id = this.editoriales_id;
            BDContext.SaveChanges();
        }
        public void Eliminar()
        {

        }
    }
}
