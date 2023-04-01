using Travel.BD.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Microsoft.AspNetCore.Mvc;
namespace Travel.BD.Services.Editorial
{
    //clase encargada de la informacion de la tabla editoriales

    public class EditorialesServices
    {

        public void Crear(Travel.BD.Models.Master.Editoriales editoriales)
        {
            editoriales.Crear(editoriales);
        }
        public List<Editoriales> Buscar()
        {
            Editoriales editoriales = new Editoriales();
            return editoriales.Buscar();
        }
        public void Actualizar(Editoriales editoriales)
        {
            editoriales.Actualizar();
        }
        public List<Editoriales> BuscarCoincidencias(String coincidencia)
        {
            Editoriales editoriales = new Editoriales();
            return editoriales.BuscarCoincidencia(coincidencia);
        }
        public Editoriales BuscarUnico(int editoriales)
        {
            return new Editoriales().BuscarUnico(editoriales);
        }
        public void Eliminar(Editoriales editoriales)
        {
            editoriales.Eliminar();
        }
    }
}
