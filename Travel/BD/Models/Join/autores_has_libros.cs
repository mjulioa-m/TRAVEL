using System;
using System.Collections.Generic;
using System.Linq;
using Travel.BD.Models.Context;
namespace Travel.BD.Models.Join
{
    //clase que une la tabla de autores con libros
    public class autores_has_libros
    {


        public int autores { get; set; }
        public int libros { get; set; }
        public List<autores_has_libros> Buscar( )
        {
            BDContextModel BDContext = new BDContextModel();
            var listautores_has_libros = BDContext.autores_has_libros.ToList();
            return listautores_has_libros;
        }
        public List<autores_has_libros> BuscarCoincidencia(String coincidencia)
        {
            BDContextModel BDContext = new BDContextModel();
            var listautores_has_libros = BDContext.autores_has_libros.Where(b => (b.autores.ToString().ToUpper().Contains(coincidencia.ToUpper()) || b.libros.ToString().ToUpper().Contains(coincidencia.ToUpper()))).ToList();
            return listautores_has_libros;
        }
        public autores_has_libros BuscarUnico(int codigo)
        {
            BDContextModel BDContext = new BDContextModel();
            var listautores_has_libros = BDContext.autores_has_libros.Where(b => b.autores == codigo ).ToList();
            if (listautores_has_libros.Count != 0)
            {
                return listautores_has_libros[0];
            }
            else
            {
                return new autores_has_libros
                {
                    libros = 0,
                    autores=0
                };
            }
        }
        public void Crear(autores_has_libros bodega)
        {
            BDContextModel BDContext = new BDContextModel();
            BDContext.autores_has_libros.Add(bodega);
            BDContext.SaveChanges();
        }
        public void Actualizar( )
        {
            BDContextModel BDContext = new BDContextModel();
            var bodega = BDContext.autores_has_libros.Find(this.autores);
            bodega.autores = this.autores;
            bodega.libros = this.libros;
            BDContext.SaveChanges();
        }
        public void Eliminar()
        {
            BDContextModel BDContext = new BDContextModel();
            var listautores_has_libros = BDContext.autores_has_libros. Where(b => b.autores == this.autores);
            foreach (var item in listautores_has_libros)
            {
                BDContext.autores_has_libros.Remove(item);
            }
            BDContext.SaveChanges();
        }
    }
}
