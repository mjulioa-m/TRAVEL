import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Card, CardBody, CardHeader, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Autores from './views/autores'
import Editoriales from './views/editoriales'
import Libros from './views/libros'
import AutoresLibros from './views/autores_has_libros'


import AutoresReportes from './Reports/autores'
import LibrosReportes from './Reports/libros'
import AutoresLibrosReportes from './Reports/autores_has_libros'
import AutoresGraphics from './Graphics/autores'

const App = (props) => {
    const [key, setKey] = React.useState('home');
    // abrir tabs para el personal encargado de ingresar el inventario
    const [autores, setautores] = React.useState(false);
    const [autores_has_libros, setautores_has_libros] = React.useState(false);
    const [libros, setlibros] = React.useState(false);
    const [editoriales, seteditoriales] = React.useState(false);

    // abrir tabs para el personal encargado de revisar el inventario
    const [autoresreportes, setautoresreportes] = React.useState(false);
    const [autores_has_librosreportes, setautores_has_librosreportes] = React.useState(false);
    const [librosreportes, setlibrosreportes] = React.useState(false);
    const [editorialesreportes, seteditorialesreportes] = React.useState(false);

    const [autoresgraficos, setautoresgraficos] = React.useState(false);


    return (
        <>

            <NavBar
                setautores={(autores) => {
                    setautores(autores)
                    setKey('Crear Autor')
                }}
                seteditoriales={(editoriales) => {
                    seteditoriales(editoriales)
                    setKey('Crear Editorial')
                }}
                setlibros={(libros) => {
                    setlibros(libros)
                    setKey('Crear Libro')
                }}
                setautores_has_libros={(autores_has_libros) => {
                    setautores_has_libros(autores_has_libros)
                    setKey('Autores/Libros')
                }}

                setautoresreportes={(autores) => {
                    setautoresreportes(autores)
                    setKey('Reporte Autor')
                }}
                seteditorialesreportes={(editoriales) => {
                    seteditorialesreportes(editoriales)
                    setKey('Reporte Editorial')
                }}
                setlibrosreportes={(libros) => {
                    setlibrosreportes(libros)
                    setKey('Reporte Libro')
                }}
                setautores_has_librosreportes={(autores_has_libros) => {
                    setautores_has_librosreportes(autores_has_libros)
                    setKey('Reporte Autores/Libros')
                }}

                setautoresgraficos={(autoresgraficos) => {
                    setautoresgraficos(autoresgraficos)
                    setKey('Grafico Autores')
                }}
            />

            {/*Content Wrapper*/}
            <div id="content-wrapper" className="d-flex flex-column">

                {/*Main Content*/}
                <div id="content">

                    <div className="container-fluid">

                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className=" pesta�as"
                        >
                           
                            {(autores) &&
                                <Tab eventKey="Crear Autor" title="Autores">
                                    <Autores setautores={(autores) => {
                                        setautores(autores)
                                    }} />
                                </Tab>}
                            {(editoriales) &&
                                <Tab eventKey="Crear Editorial" title="Editorales">
                                    <Editoriales seteditoriales={(editoriales) => {
                                        seteditoriales(editoriales)
                                    }} />
                                </Tab>}
                            {(libros) &&
                                <Tab eventKey="Crear Libro" title="Libros">
                                    <Libros setlibros={(libros) => {
                                        setlibros(libros)
                                    }} />
                                </Tab>}
                            {(autores_has_libros) &&
                                <Tab eventKey="Autores/Libros" title="Autores/Libros">
                                    <AutoresLibros setautores_has_libros={(autores_has_libros) => {
                                        setautores_has_libros(autores_has_libros)
                                    }} />
                                </Tab>}



                            {(autoresreportes) &&
                                <Tab eventKey="Reporte Autor" title="Autores">
                                    <AutoresReportes setautoresreportes={(autores) => {
                                        setautoresreportes(autores)
                                    }} />
                                </Tab>}
                            {(editorialesreportes) &&
                                <Tab eventKey="Reporte Editorial" title="Editorales">
                                    <editorialesreportes seteditorialesreportes={(editoriales) => {
                                        seteditorialesreportes(editoriales)
                                    }} />
                                </Tab>}
                            {(librosreportes) &&
                                <Tab eventKey="Reporte Libro" title="Libros">
                                    <LibrosReportes setlibrosreportes={(libros) => {
                                        setlibrosreportes(libros)
                                    }} />
                                </Tab>}
                            {(autores_has_librosreportes) &&
                                <Tab eventKey="Reporte Autores/Libros" title="Autores/Libros">
                                    <AutoresLibrosReportes setautores_has_librosreportes={(autores_has_libros) => {
                                        setautores_has_librosreportes(autores_has_libros)
                                    }} />
                                </Tab>}

                            {(autoresgraficos) &&
                                <Tab eventKey="Grafico Autores" title="Autores">
                                    <AutoresGraphics setautoresgraficos={(autoresgraficos) => {
                                        setautoresgraficos(autoresgraficos)
                                    }} />
                                </Tab>}

                        </Tabs>

                        {/* <Outlet /> */}

                    </div>
                    <div className="container-fluid">

                        <Outlet />

                    </div>
                </div>
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy;Solifactin S.A.S 2022</span>
                        </div>
                    </div>
                </footer>
            </div>


        </>
    )
}

export default App