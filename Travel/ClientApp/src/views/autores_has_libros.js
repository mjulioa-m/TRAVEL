import React, { useEffect, useState, useContext } from "react";
import DataTable from 'react-data-table-component';
import { InputGroup, Table, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter, Row, Col } from "reactstrap"
import Swal from 'sweetalert2'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Buscar from '../components/Buscar'
const modeloAutores = {
    id: 0,
    nombre: "",
    apellidos: "",
}
const AutoresLibros = (props) => {
    const [Autores, setAutores] = useState(modeloAutores);
    const [Libros, setLibros] = useState([]);
    const [AutoresLibros, setAutoresLibros] = useState([]);
    const [Autoress, setAutoress] = useState([]);
    const [fila, setfila] = useState(0);
    const [editar, seteditar] = useState(0);
    const [key, setKey] = useState('Datos');
    const [roles, setRoles] = useState([]);
    const [pendiente, setPendiente] = useState(true);
    const [verModalAutores, setVerModalAutores] = useState(false);
    const [busquedalibros, setbusquedalibros] = useState([]);
    const [verModallibros, setVerModallibros] = useState(false);
    const handleChange = (e) => {
        let value = e.target.value
        console.log(e.target)
        var _Autores = { ...Autores }
        _Autores[e.target.name] = value
        setAutores(_Autores)
        setRoles([])


    }
    const obtenerAutoress = async (coincidencia) => {
        try {
            let response = await fetch('Autoresapi/' + coincidencia + '');

            if (response.ok) {
                let data = await response.json()
                setAutoress(data)
                setPendiente(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const obtenerAutoresLibros = async (coincidencia) => {
        try {
            let response = await fetch('AutoresLibrosApi');

            if (response.ok) {
                let data = await response.json()
                setAutoresLibros(data)
                setPendiente(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const obtenerLibross = async (coincidencia) => {
        try {
            let response = await fetch('Librosapi/' + coincidencia + '');

            if (response.ok) {
                let data = await response.json()
                setLibros(data)
                setPendiente(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        obtenerAutoress('');
        obtenerLibross('')
    }, [])
    const columns = [
        {
            name: 'Nombres',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Apellidos',
            selector: row => row.apellidos,
            sortable: true,
        },
        {
            name: '',
            cell: row => (
                <>
                    <Button color="primary" size="sm" className="mr-2"
                        onClick={() => {
                            obtenerLibross('')
                            obtenerAutoresLibros('')
                            abrirEditarModalAutores(row)
                        }}
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
    const abrirEditarModalAutores = (data) => {
        var enviodata = { ...data }
        var _Autores = {
            id: enviodata.id,
            nombre: enviodata.nombre,
            apellidos: enviodata.apellidos,
        }
        setAutores(_Autores);
        setVerModalAutores(!verModalAutores);
        seteditar(true)
    }
    const cerrarModalAutores = () => {
        setAutores(modeloAutores)
        setVerModalAutores(!verModalAutores);
        seteditar(false)
        setKey('Datos')
    }
    const asignarceros = (_Autores) => {

        let claves = Object.keys(_Autores);
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            if (clave == 'nombre' || clave == 'apellidos') {
                _Autores[clave] = Number(_Autores[clave]+"")
            }
        }
        return _Autores
    }
    const verificar = (_AutoresLibros) => {
        var datos = _AutoresLibros.filter(p => p.autores == 0 || p.libros == 0)
        if (datos.length!=0) {
            return false
        } else {
            return true
        }
    }
    const guardarCambios = async () => {
        let response;
        console.log(Autores)
        
        var _AutoresLibros = AutoresLibros.map((dato, index) => {
            var dat = {
                ...dato,
                ['autores']: Number(dato.autores+""),
                ['libros']: Number(dato.libros + ""),

            }
            return dat

        })
        var _verificado = verificar(_AutoresLibros)
        if (_verificado) {
                response = await fetch("AutoresLibrosApi", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(_AutoresLibros)
                })

            

            if (response.ok) {
                
                setAutores(modeloAutores)
                setVerModalAutores(!verModalAutores);
                setKey('Datos')
                Swal.fire(
                    'Guardado Exitosamente!',
                    'El Autores fue guardado exitosamente',
                    'success'
                )
            } else {
                Swal.fire(
                    'Error al Guardar!',
                    'Sucedio un error al guardar el Autores',
                    'error'
                )
            }
        } else {
            Swal.fire(
                'Error al Guardar!',
                'Faltan Datos Por llenar',
                'error'
            )
        }

    }
    const agregarlibro = async (e, index) => {
        var _AutoresLibros = AutoresLibros.map((dato, index) => {
            var dat = {
                ...dato,
                ['autores']: dato.autores,
                ['libros']: dato.libros,

            }
            return dat

        })
        var _AutoresLibrosfinales = _AutoresLibros.concat({
            ['autores']: Autores.id,
            ['libros']: 0
        })
        setAutoresLibros(_AutoresLibrosfinales)
        setRoles([])

    }
    const filtrarlibros = async (coincidencia) => {
        var _libros = Libros.filter((dato) => {
            if ((dato.isbn+"").toUpperCase().includes(coincidencia.toUpperCase()) || dato.titulo.toUpperCase().includes(coincidencia.toUpperCase())) { return dato }

        })
        setbusquedalibros(_libros)
    }
    const cerrarModalSeleccionlibros = () => {
        setVerModallibros(false);
        setbusquedalibros(Libros)
    }

    const seleccionarlibros = (e) => {
        let value = e

        var _Libros = AutoresLibros.map((dato, index) => {
            if (true) {
                var dat = {
                    ...dato,
                    ['autores']: dato.autores,
                    ['libros']: value.isbn,

                }
                return dat
            } else {
                return dato
            }

        })
        setAutoresLibros(_Libros)
        setRoles([])
        cerrarModalSeleccionlibros()
    }

    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: '#188BAD', color: "white" }}>
                    Autores
                </CardHeader>
                <CardBody>
                    <div class="col-sm-6" >
                        <div class="input-group input-group-sm mb-3" >
                            <div class="input-group-prepend" >

                                <input type="text" id="buscardataAutoress" placeholder='Buscar' />
                            </div>
                            <Button color="primary" className="ml-2" size="sm" onClick={() => obtenerAutoress(document.getElementById('buscardataAutoress').value)}>Buscar</Button>
                            
                        </div>
                    </div>


                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={Autoress}
                        progressPending={pendiente}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
            <Modal size="lg" isOpen={verModalAutores}>
                <ModalHeader>
                    Libros por Autor
                </ModalHeader>
                <ModalBody>
                    <Tabs
                        id="controlled-tab-example2"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className=" pestañas"
                    >
                        <Tab eventKey="Datos" title="Datos">
                            <Row>
                                <Col sm={2}>
                                    <FormGroup>
                                        <Label style={{ fontSize: '13px' }} >Autor</Label>
                                        <Input disabled type="text" bsSize="sm" onChange={handleChange} name="nombre" value={Autores.nombre} />
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={12}>

                                    <Table striped size="lg" className="table-responsive" style={{ height: '300px' }}>
                                        <thead>
                                            <tr>
                                                <th>Libros</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (AutoresLibros.length < 1) ? (
                                                    <tr>
                                                        <td colSpan="5">{<a onClick={(e) => { agregarlibro(e) }} className={"badge badge-info p-2"}>{"Agregar Direcciones"}</a>}</td>
                                                    </tr>
                                                ) :
                                                    (
                                                        AutoresLibros.map((item, index) => (
                                                            <tr key={(index + 1)}>

                                                                <td colSpan="7">
                                                                    <FormGroup inline={true}>
                                                                        <Label >Libro</Label>
                                                                        <InputGroup>
                                                                            <Input bsSize="sm" onKeyDown={(e) => {
                                                                                if (e.key == "Enter" && e.target.value == "") {
                                                                                    setbusquedalibros(Libros)
                                                                                    setVerModallibros(true)

                                                                                }
                                                                            }} placeholder="Editorial" name="libros" value={AutoresLibros[index].libros} />
                                                                            <Button color="primary" size="sm" className="mr-2"
                                                                                onClick={() => {
                                                                                    setbusquedalibros(Libros)
                                                                                    setVerModallibros(true)
                                                                                }}
                                                                            >
                                                                                <i className="fas fa-pen-alt"></i>
                                                                            </Button>
                                                                        </InputGroup>

                                                                    </FormGroup>
                                                                </td>
                                                                <td colSpan="7">{<a onClick={(e) => { agregarlibro(e) }} className={"badge badge-info p-2"}>{"Agregar Libro"}</a>}</td>
                                                            </tr>
                                                        ))
                                                    )


                                            }
                                        </tbody>
                                    </Table>
                                </Col>

                            </Row>

                        </Tab>
                    </ Tabs >
                    <Buscar tituloencabezado={"Buscar Libro"} filtrar={(coincidencia) => { filtrarlibros(coincidencia) }} busqueda={busquedalibros} encabezado={["ISBN", "Editorial", "Titulo"]} codigo={"isbn"} nombre={"editoriales_id"} dato={"titulo"} dato2={""} verModal={verModallibros} cerrarModal={() => { cerrarModalSeleccionlibros() }} seleccionar={(seleccionado) => {
                        seleccionarlibros(seleccionado)
                    }} />
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" onClick={guardarCambios}>Guardar</Button>
                    <Button size="sm" color="danger" onClick={cerrarModalAutores}>Cerrar</Button>
                </ModalFooter>
            </Modal>

        </>
    )
}
export default AutoresLibros;
