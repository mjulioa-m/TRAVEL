using Microsoft.EntityFrameworkCore;
using Travel.BD.Models.Join;
using Travel.BD.Models.Master;

namespace Travel.BD.Models.Context
{
    //Context de la base de datos usando entity Framework Core
    public class BDContextModel : DbContext
    {
        //Importante digitar la ruta antes de correr la aplicacion
        public static string conexion = "Data Source=NOMBRE_SERVIDOR;Initial Catalog =travel;TrustServerCertificate=True; User ID = USUARIO_SQL(GENERALMENTE sa); Password=CONTRASEÑA";
        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }
        public BDContextModel() : base(GetOptions(conexion))
        {
        }


        public DbSet<Autores> Autores { get; set; }
        public DbSet<Editoriales> Editoriales { get; set; }
        public DbSet<Libros> Libros { get; set; }
        public DbSet<autores_has_libros> autores_has_libros { get; set; }
        //al crear el modelo se le especifica a este las propiedades que van a tener cada una de las tablas
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Autores>()
            .HasKey(m => new { m.id });
            modelBuilder.Entity<Autores>()
           .Property(x => x.id)
           .HasMaxLength(10);
            modelBuilder.Entity<Autores>()
            .Property(x => x.nombre)
            .HasMaxLength(45);
            modelBuilder.Entity<Autores>()
           .Property(x => x.apellidos)
           .HasMaxLength(45);
            modelBuilder.Entity<Editoriales>()
            .HasKey(m => new { m.id }) ;
            modelBuilder.Entity<Editoriales>()
         .Property(x => x.id)
         .HasMaxLength(10);
            modelBuilder.Entity<Editoriales>()
          .Property(x => x.nombre)
          .HasMaxLength(45);
            modelBuilder.Entity<Editoriales>()
          .Property(x => x.sede)
          .HasMaxLength(45);
            //llave foranea
            modelBuilder.Entity<Editoriales>()
            .HasOne(e => e.Libros)
            .WithOne(e => e.Editoriales)
            .HasPrincipalKey<Editoriales>(e => e.id)
            .HasForeignKey<Libros>(e => e.editoriales_id);
            //llave foranea

            modelBuilder.Entity<Libros>()
           .HasKey(m => new { m.ISBN });
            modelBuilder.Entity<Libros>()
            .Property(e => e.sipnosis)
            .HasColumnType("text");
            modelBuilder.Entity<Libros>()
          .Property(x => x.ISBN)
          .HasMaxLength(13);
            modelBuilder.Entity<Libros>()
         .Property(x => x.editoriales_id)
         .HasMaxLength(10);
            modelBuilder.Entity<Libros>()
         .Property(x => x.titulo)
         .HasMaxLength(45);
            modelBuilder.Entity<Libros>()
         .Property(x => x.n_paginas)
         .HasMaxLength(45);
            modelBuilder.Entity<autores_has_libros>()
            .HasKey(m => new { m.autores, m.libros });
            base.OnModelCreating(modelBuilder);
        }
        //se genera la base de datos solo si no existe
        public void generarDB()
        {
            if (!this.Database.CanConnect())
            {
                this.Database.EnsureDeleted();
                this.Database.EnsureCreated();
            }
        }
    }


}
