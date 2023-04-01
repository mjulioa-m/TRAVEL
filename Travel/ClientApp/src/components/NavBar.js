import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// import Icono from '../views/images/logodashboardsinletras.png'
import Swal from 'sweetalert2'

const NavBar = (props) => {

    return (

        <ul className="navbar-nav  sidebar sidebar-dark accordion" style={{ background: '#188BAD' }} id="accordionSidebar">

            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon">
                    {/* <i className="fas fa-desktop"></i> */}
                </div>
                <div className="sidebar-brand-text mx-3" >Travel</div>
            </Link>

            <hr className="sidebar-divider my-0" />


            {
                (true) &&
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAdministracion"
                        aria-expanded="true" aria-controls="collapseAdministracion">
                        <i className="fas fa-fw fa-user"></i>
                        <span>Administrador</span>
                    </a>
                    <div id="collapseAdministracion" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <a onClick={() => { props.setautores(true) }} href="#" className="collapse-item">Autores</a>
                                <a onClick={() => { props.seteditoriales(true) }} href="#" className="collapse-item">Editoriales</a>
                                <a onClick={() => { props.setlibros(true) }} href="#" className="collapse-item">Libros</a>
                                <a onClick={() => { props.setautores_has_libros(true) }} href="#" className="collapse-item">Autores/Libros</a>
                                
                            </div>
                    </div>
                </li>
            }
            {
                (true) &&
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseReportes"
                        aria-expanded="true" aria-controls="collapseReportes">
                        <i className="fas fa-fw fa-user"></i>
                        <span>Reportes</span>
                    </a>
                    <div id="collapseReportes" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                                <a onClick={() => { props.setautoresreportes(true) }} href="#" className="collapse-item">Autores</a>
                                <a onClick={() => { props.seteditorialesreportes(true) }} href="#" className="collapse-item">Editoriales</a>
                                <a onClick={() => { props.setlibrosreportes(true) }} href="#" className="collapse-item">Libros</a>
                                <a onClick={() => { props.setautores_has_librosreportes(true) }} href="#" className="collapse-item">Autores/Libros</a>

                        </div>
                    </div>
                </li>
            }

            {
                (true) &&
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseGraficos"
                        aria-expanded="true" aria-controls="collapseGraficos">
                        <i className="fas fa-fw fa-user"></i>
                        <span>Graficos</span>
                    </a>
                    <div id="collapseGraficos" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                                <a onClick={() => { props.setautoresgraficos(true) }} href="#" className="collapse-item">Autores</a>
                          
                        </div>
                    </div>
                </li>
            }

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
    )
}

export default NavBar;