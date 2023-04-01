using Travel.BD.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Microsoft.AspNetCore.Mvc;
using Travel.BD.Services.BD;
using LinqToDB;

namespace Travel.BD.Services.Libro
{
    //clase encargada de los reportes de la tabla de libros

    public class LibrosReportesServices
    {
        public class librosreporte
        {
            public int isbn { get; set; }
            public string nombre { get; set; }
            public string titulo { get; set; }
            public string sipnosis { get; set; }
            public string n_paginas { get; set; }
        }
        public List<librosreporte> Buscar()
        {
            var conexion = Conexiones.ObtenerConexionsql();
            var comando = conexion.CreateCommand();
            comando.CommandText = "IF OBJECT_ID('dbo.librosreporte') IS NOT NULL" +
                                  "    DROP view dbo.librosreporte; ";
            //long ultimo = BD.Academico.BD.ToInt64(comando.ExecuteScalar());
            comando.ExecuteNonQuery();

            comando.CommandText = "create view librosreporte as select titulo,sipnosis,n_paginas,nombre,isbn from libros inner join editoriales on editoriales.id=libros.editoriales_id ";
            comando.ExecuteNonQuery();
            conexion.Close();
            var dc = new DataContext("System.Data.SqlClient", BDContextModel.conexion);

            var reporte = dc.GetTable<librosreporte>().ToList();

            return reporte;
        }
    }
}
