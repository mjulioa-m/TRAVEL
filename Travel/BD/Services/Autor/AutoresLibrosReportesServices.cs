using Travel.BD.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.BD.Models.Master;
using Microsoft.AspNetCore.Mvc;
using Travel.BD.Services.BD;
using LinqToDB;
namespace Travel.BD.Services.Autor
{
    //clase encargada de los reportes de la tabla autores_has_libros
    public class AutoresLibrosReportesServices
    {

        public class autoreslibros
        {
            public string autor { get; set; }
            public string libro { get; set; }
            public string editorial { get; set; }
        }
        public class autorescantidadeslibros
        {
            public string autores { get; set; }
            public long libros { get; set; }
        }
        public List<autoreslibros> Buscar()
        {
            var conexion = Conexiones.ObtenerConexionsql();
            var comando = conexion.CreateCommand();
            comando.CommandText = "IF OBJECT_ID('dbo.autoreslibros') IS NOT NULL" +
                                  "    DROP view dbo.autoreslibros; ";
            //long ultimo = BD.Academico.BD.ToInt64(comando.ExecuteScalar());
            comando.ExecuteNonQuery();

            comando.CommandText = "create view autoreslibros as  select Autores.nombre as autor,Libros.titulo as libro,Editoriales.nombre as editorial from autores_has_libros inner join libros on libros.ISBN=autores_has_libros.libros inner join Autores on Autores.id=autores_has_libros.autores inner join Editoriales on Editoriales.id =Libros.editoriales_id ";
            comando.ExecuteNonQuery();
            conexion.Close();
            var dc = new DataContext("System.Data.SqlClient", BDContextModel.conexion);

            var reporte = dc.GetTable<autoreslibros>().ToList();

            return reporte;
        }
        public List<autorescantidadeslibros> BuscarCantidades()
        {
            var conexion = Conexiones.ObtenerConexionsql();
            var comando = conexion.CreateCommand();
            comando.CommandText = "IF OBJECT_ID('dbo.autorescantidadeslibros') IS NOT NULL" +
                                  "    DROP view dbo.autorescantidadeslibros; ";
            //long ultimo = BD.Academico.BD.ToInt64(comando.ExecuteScalar());
            comando.ExecuteNonQuery();

            comando.CommandText = "create view autorescantidadeslibros as  select Autores.nombre+' '+Autores.apellidos as autores,COUNT(libros) as libros from autores_has_libros inner join Autores on Autores.id=autores_has_libros.autores group by Autores.nombre,Autores.apellidos";
            comando.ExecuteNonQuery();
            conexion.Close();
            var dc = new DataContext("System.Data.SqlClient", BDContextModel.conexion);

            var reporte = dc.GetTable<autorescantidadeslibros>().ToList();

            return reporte;
        }
    }
}
