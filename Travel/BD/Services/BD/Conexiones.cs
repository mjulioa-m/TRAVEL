using Microsoft.Data.SqlClient;
using System;
using Travel.BD.Models.Context;

namespace Travel.BD.Services.BD
{
    //clase encargada de la conexion para los reportes
    public class Conexiones
    {
        public static SqlConnection ObtenerConexionsql()
        {
            //var conexion = new OleDbConnection();
            var conexion = new SqlConnection();
            conexion.ConnectionString = BDContextModel.conexion;
            conexion.Open();

            return conexion;
        }
    }
}
