import React, { useEffect, useState, useContext } from "react";
import DataTable from 'react-data-table-component';
import { InputGroup, Table, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter, Row, Col } from "reactstrap"
import Swal from 'sweetalert2'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Buscar from '../components/Buscar'
const modeloLibros = {
    ISBN:0,
    editoriales_id: 0,
    titulo: "",
    sipnosis: "",
    n_paginas: "",
}
const Libros = (props) => {
    const [Libros, setLibros] = useState(modeloLibros);
    const [Libross, setLibross] = useState([]);
    const [ISBN, setISBN] = useState([]);
    const [ids, setids] = useState([]);
    const [nombre, setnombre] = useState([]);
    const [nombres, setnombres] = useState([]);
    const [sede, setapellidos] = useState([]);
    const [apellidoss, setapellidoss] = useState([]);
    const [fila, setfila] = useState(0);
    const [fila2, setfila2] = useState(0);
    const [editar, seteditar] = useState(0);
    const [key, setKey] = useState('Datos');
    const [roles, setRoles] = useState([]);
    const [pendiente, setPendiente] = useState(true);
    const [verModalLibros, setVerModalLibros] = useState(false);
    const [busquedaeditoriales, setbusquedaeditoriales] = useState([]);
    const [verModaleditoriales, setVerModaleditoriales] = useState(false);
    const [editorials, seteditorials] = useState(false);
    
    const handleChange = (e) => {
        let value = e.target.value
        console.log(e.target)
        var _Libros = { ...Libros }
        _Libros[e.target.name] = value
        setLibros(_Libros)
        setRoles([])


    }

    const obtenerLibross = async (coincidencia) => {
        try {
            let response = await fetch('Librosapi/' + coincidencia + '');

            if (response.ok) {
                let data = await response.json()
                setLibross(data)
                setPendiente(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        obtenerLibross('');
    }, [])
    const columns = [
        {
            name: 'Editorial',
            selector: row => row.editoriales_id,
            sortable: true,
        },
        {
            name: 'Titulo',
            selector: row => row.titulo,
            sortable: true,
        }, {
            name: 'Sipnosis',
            selector: row => row.sipnosis,
            sortable: true,
        }, {
            name: 'N. Paginas',
            selector: row => row.n_paginas,
            sortable: true,
        },
        {
            name: '',
            cell: row => (
                <>
                    <Button color="primary" size="sm" className="mr-2"
                        onClick={() => abrirEditarModalLibros(row)}
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Button>

                </>
            ),
        },
    ];
    const customStyles = {
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: 800,
            },
        },
        headRow: {
            style: {
                backgroundColor: "#eee",
            }
        }
    };
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    const abrirEditarModalLibros = (data) => {
        var enviodata = { ...data }
        var _Libros = {
            ISBN: enviodata.ISBN,
            nombre: enviodata.nombre,
            sede: enviodata.sede,
        }
        setLibros(_Libros);
        setVerModalLibros(!verModalLibros);
        seteditar(true)
    }
    const cerrarModalLibros = () => {
        setLibros(modeloLibros)
        setVerModalLibros(!verModalLibros);
        seteditar(false)
        setKey('Datos')
    }
    const asignarceros = (_Libros) => {

        let claves = Object.keys(_Libros);
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            if (false) {
                _Libros[clave] = Number(_Libros[clave])
            }
        }
        return _Libros
    }
    const verificar = (_Libros) => {

        let claves = Object.keys(_Libros);
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            if (clave == 'titulo' || clave == 'editoriales_id' || clave == 'n_paginas') {
                if (_Libros[clave] == '') {
                    return false
                }
            }
        }
        return true
    }
    const filtrareditoriales = async (coincidencia) => {
        var _libros = Libros.filter((dato) => {
            if (dato.codigo.toUpperCase().includes(coincidencia.toUpperCase()) || dato.nombre.toUpperCase().includes(coincidencia.toUpperCase())) { return dato }

        })
        setbusquedaeditoriales(_libros)
    }
    const cerrarModalSeleccioneditoriales = () => {
        setVerModaleditoriales(false);
        setbusquedaeditoriales(Libros)
    }

    const seleccionareditoriales = (e) => {
        let value = e
        
        var _Libros = { ...Libros }
        _Libros['editoriales_id'] = value.id
        setLibros(_Libros)
        setRoles([])
        cerrarModalSeleccioneditoriales()
    }

    const buscartodaseditorials = (value) => {
        try {

            const api = fetch('EditorialesApi/' + value + '')
                .then((response) => {
                    return response.ok ? response.json() : Promise.reject(response);
                })
                .then((dataJson) => {
                    seteditorials(dataJson)
                    setbusquedaeditoriales(dataJson)
                }).catch((error) => {
                    console.log("No se pudo obtener datos, mayor detalle: ", error)
                    seteditorials([])
                    setbusquedaeditoriales([])
                })
        } catch (error) {
            console.log(error)
        }
    }
    const guardarlogdeerrores = (contenido) => {
        const a = document.createElement("a");
        const archivo = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = 'log';
        a.click();
        URL.revokeObjectURL(url);
    }
    const guardarCambios = async () => {
        let response;
        console.log(Libros)
        var _Libros = { ...Libros }
        _Libros = asignarceros(_Libros)
        var _verificado = verificar(_Libros)
        if (_verificado) {
            console.log(_Libros)
            if (!editar) {
                response = await fetch("Librosapi", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(_Libros)
                })

            } else {
                response = await fetch("Librosapi", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(_Libros)
                })
            }

            if (response.ok) {
                await obtenerLibross('');
                setLibros(modeloLibros)
                setVerModalLibros(!verModalLibros);
                setKey('Datos')
                Swal.fire(
                    'Guardado Exitosamente!',
                    'El Libros fue guardado exitosamente',
                    'success'
                )
            } else {
                try {
                    var ee = await response.json()
                    Swal.fire(
                        'Opps!',
                        'No se pudo crear el libro: ' + ee.mensaje,
                        'error'
                    )
                    guardarlogdeerrores(ee.mensaje)
                } catch (error) {
                    Swal.fire(
                        'Opps!',
                        'No se pudo crear el libro: ' + 'Error de conexion',
                        'error'
                    )
                    guardarlogdeerrores('Error de conexion')
                }
            }
        } else {
            Swal.fire(
                'Error al Guardar!',
                'Faltan Datos Por llenar',
                'error'
            )
        }

    }

    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: '#188BAD', color: "white" }}>
                    Libros
                </CardHeader>
                <CardBody>
                    <div class="col-sm-6" >
                        <div class="input-group input-group-sm mb-3" >
                            <div class="input-group-prepend" >

                                <input type="text" ISBN="buscardataLibross" placeholder='Buscar' />
                            </div>
                            <Button color="primary" className="ml-2" size="sm" onClick={() => obtenerLibross(document.getElementById('buscardataLibross').value)}>Buscar</Button>
                            <Button color="success" className="ml-2" size="sm" onClick={() => {
                                setVerModalLibros(!verModalLibros)
                                seteditar(false)
                                buscartodaseditorials('')
                            }}>Nuevo</Button>
                        </div>
                    </div>


                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={Libross}
                        progressPending={pendiente}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
            <Modal size="lg" isOpen={verModalLibros}>
                <ModalHeader>
                    Detalle Libross
                </ModalHeader>
                <ModalBody>
                    <Tabs
                        ISBN="controlled-tab-example2"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className=" pestañas"
                    >
                        <Tab eventKey="Datos" title="Datos">
                            <Row>
                                <Col sm={4}>
                                    <FormGroup inline={true}>
                                        <Label >Editorial*</Label>
                                        <InputGroup>
                                            <Input  bsSize="sm" onKeyDown={(e) => {
                                                if (e.key == "Enter" && e.target.value == "") {
                                                    setbusquedaeditoriales(editorials)
                                                    setVerModaleditoriales(true)

                                                }
                                            }} placeholder="Editorial" name="editoriales_id" value={Libros.editoriales_id} />
                                            <Button color="primary" size="sm" className="mr-2"
                                                onClick={() => {
                                                    setbusquedaeditoriales(editorials)
                                                    setVerModaleditoriales(true)
                                                }}
                                            >
                                                <i className="fas fa-pen-alt"></i>
                                            </Button>
                                        </InputGroup>

                                    </FormGroup>
                                </Col>
                                
                                <Col sm={2}>
                                    <FormGroup>
                                        <Label >Titulo*</Label>
                                        <Input type="text" bsSize="sm" onChange={handleChange} name="titulo" value={Libros.titulo} />
                                    </FormGroup>
                                </Col>
                                
                                <Col sm={2}>
                                    <FormGroup>
                                        <Label >N. Paginas*</Label>
                                        <Input type="number" bsSize="sm" onChange={handleChange} name="n_paginas" value={Libros.n_paginas} />
                                    </FormGroup>
                                </Col>
                              
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    <FormGroup>
                                        <Label  >Sipnosis*</Label>
                                        <Input type="textarea" bsSize="sm" onChange={handleChange} name="sipnosis" value={Libros.sipnosis} />
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Tab>
                    </ Tabs >
                    <Buscar tituloencabezado={"Buscar Editoriales"} filtrar={(coincidencia) => { filtrareditoriales(coincidencia) }} busqueda={busquedaeditoriales} encabezado={["id", "Nombre", "Sede"]} codigo={"id"} nombre={"nombre"} dato={"sede"} dato2={""} verModal={verModaleditoriales} cerrarModal={() => { cerrarModalSeleccioneditoriales() }} seleccionar={(seleccionado) => {
                        seleccionareditoriales(seleccionado)
                    }} />
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" onClick={guardarCambios}>Guardar</Button>
                    <Button size="sm" color="danger" onClick={cerrarModalLibros}>Cerrar</Button>
                </ModalFooter>
            </Modal>

        </>
    )
}
export default Libros;
