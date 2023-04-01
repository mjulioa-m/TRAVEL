import React, { useEffect, useState, useContext } from "react";
import DataTable from 'react-data-table-component';
import { InputGroup, Table, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter, Row, Col } from "reactstrap"
import Swal from 'sweetalert2'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Buscar from '../components/Buscar'
const modeloAutores = {
    id:0,
    nombre: "",
    apellidos: "",
}
const Autores = (props) => {
    const [Autores, setAutores] = useState(modeloAutores);
    const [Autoress, setAutoress] = useState([]);
    const [id, setid] = useState([]);
    const [ids, setids] = useState([]);
    const [nombre, setnombre] = useState([]);
    const [nombres, setnombres] = useState([]);
    const [apellidos, setapellidos] = useState([]);
    const [apellidoss, setapellidoss] = useState([]);
    const [fila, setfila] = useState(0);
    const [fila2, setfila2] = useState(0);
    const [editar, seteditar] = useState(0);
    const [key, setKey] = useState('Datos');
    const [roles, setRoles] = useState([]);
    const [pendiente, setPendiente] = useState(true);
    const [verModalAutores, setVerModalAutores] = useState(false);
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
    useEffect(() => {
        obtenerAutoress('');
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
                        onClick={() => abrirEditarModalAutores(row)}
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
            if (false) {
                _Autores[clave] = Number(_Autores[clave])
            }
        }
        return _Autores
    }
    const verificar = (_Autores) => {

        let claves = Object.keys(_Autores);
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            if (clave == 'nombre' || clave == 'apellidos') {
                if (_Autores[clave] == '') {
                    return false
                }
            }
        }
        return true
    }
    const guardarCambios = async () => {
        let response;
        console.log(Autores)
        var _Autores = { ...Autores }
        _Autores = asignarceros(_Autores)
        var _verificado = verificar(_Autores)
        if (_verificado) {
            console.log(_Autores)
            if (!editar) {
                response = await fetch("Autoresapi", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(_Autores)
                })

            } else {
                response = await fetch("Autoresapi", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(_Autores)
                })
            }

            if (response.ok) {
                await obtenerAutoress('');
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
                            <Button color="success" className="ml-2" size="sm" onClick={() => {
                                setVerModalAutores(!verModalAutores)
                                seteditar(false)
                            }}>Nuevo</Button>
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
                    Detalle Autoress
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
                                        <Label style={{ fontSize: '13px' }} >Nombres*</Label>
                                        <Input type="text" bsSize="sm" onChange={handleChange} name="nombre" value={Autores.nombre} />
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup>
                                        <Label style={{ fontSize: '13px' }} >Apellidos*</Label>
                                        <Input type="text" bsSize="sm" onChange={handleChange} name="apellidos" value={Autores.apellidos} />
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Tab>
                    </ Tabs >
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" onClick={guardarCambios}>Guardar</Button>
                    <Button size="sm" color="danger" onClick={cerrarModalAutores}>Cerrar</Button>
                </ModalFooter>
            </Modal>

        </>
    )
}
export default Autores;
