import React, { useEffect, useState, useContext } from "react";
import DataTable from 'react-data-table-component';
import { InputGroup, Table, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter, Row, Col } from "reactstrap"
import Swal from 'sweetalert2'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Buscar from '../components/Buscar'
const modeloEditoriales = {
    id:0,
    nombre: "",
    sede: "",
}
const Editoriales = (props) => {
    const [Editoriales, setEditoriales] = useState(modeloEditoriales);
    const [Editorialess, setEditorialess] = useState([]);
    const [id, setid] = useState([]);
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
    const [verModalEditoriales, setVerModalEditoriales] = useState(false);
    const handleChange = (e) => {
        let value = e.target.value
        console.log(e.target)
        var _Editoriales = { ...Editoriales }
        _Editoriales[e.target.name] = value
        setEditoriales(_Editoriales)
        setRoles([])


    }
    const obtenerEditorialess = async (coincidencia) => {
        try {
            let response = await fetch('Editorialesapi/' + coincidencia + '');

            if (response.ok) {
                let data = await response.json()
                setEditorialess(data)
                setPendiente(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        obtenerEditorialess('');
    }, [])
    const columns = [
        {
            name: 'Nombres',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Sede',
            selector: row => row.sede,
            sortable: true,
        },
        {
            name: '',
            cell: row => (
                <>
                    <Button color="primary" size="sm" className="mr-2"
                        onClick={() => abrirEditarModalEditoriales(row)}
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
    const abrirEditarModalEditoriales = (data) => {
        var enviodata = { ...data }
        var _Editoriales = {
            id: enviodata.id,
            nombre: enviodata.nombre,
            sede: enviodata.sede,
        }
        setEditoriales(_Editoriales);
        setVerModalEditoriales(!verModalEditoriales);
        seteditar(true)
    }
    const cerrarModalEditoriales = () => {
        setEditoriales(modeloEditoriales)
        setVerModalEditoriales(!verModalEditoriales);
        seteditar(false)
        setKey('Datos')
    }
    const asignarceros = (_Editoriales) => {

        let claves = Object.keys(_Editoriales);
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            if (false) {
                _Editoriales[clave] = Number(_Editoriales[clave])
            }
        }
        return _Editoriales
    }
    const verificar = (_Editoriales) => {

        let claves = Object.keys(_Editoriales);
        for (let i = 0; i < claves.length; i++) {
            let clave = claves[i];
            if (clave == 'nombre' || clave == 'sede') {
                if (_Editoriales[clave] == '') {
                    return false
                }
            }
        }
        return true
    }
    const guardarCambios = async () => {
        let response;
        console.log(Editoriales)
        var _Editoriales = { ...Editoriales }
        _Editoriales = asignarceros(_Editoriales)
        var _verificado = verificar(_Editoriales)
        if (_verificado) {
            console.log(_Editoriales)
            if (!editar) {
                response = await fetch("Editorialesapi", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(_Editoriales)
                })

            } else {
                response = await fetch("Editorialesapi", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(_Editoriales)
                })
            }

            if (response.ok) {
                await obtenerEditorialess('');
                setEditoriales(modeloEditoriales)
                setVerModalEditoriales(!verModalEditoriales);
                setKey('Datos')
                Swal.fire(
                    'Guardado Exitosamente!',
                    'El Editoriales fue guardado exitosamente',
                    'success'
                )
            } else {
                Swal.fire(
                    'Error al Guardar!',
                    'Sucedio un error al guardar el Editoriales',
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
                    Editoriales
                </CardHeader>
                <CardBody>
                    <div class="col-sm-6" >
                        <div class="input-group input-group-sm mb-3" >
                            <div class="input-group-prepend" >

                                <input type="text" id="buscardataEditorialess" placeholder='Buscar' />
                            </div>
                            <Button color="primary" className="ml-2" size="sm" onClick={() => obtenerEditorialess(document.getElementById('buscardataEditorialess').value)}>Buscar</Button>
                            <Button color="success" className="ml-2" size="sm" onClick={() => {
                                setVerModalEditoriales(!verModalEditoriales)
                                seteditar(false)
                            }}>Nuevo</Button>
                        </div>
                    </div>


                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={Editorialess}
                        progressPending={pendiente}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
            <Modal size="lg" isOpen={verModalEditoriales}>
                <ModalHeader>
                    Detalle Editorialess
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
                                        <Input type="text" bsSize="sm" onChange={handleChange} name="nombre" value={Editoriales.nombre} />
                                    </FormGroup>
                                </Col>
                                <Col sm={2}>
                                    <FormGroup>
                                        <Label style={{ fontSize: '13px' }} >Sede*</Label>
                                        <Input type="text" bsSize="sm" onChange={handleChange} name="sede" value={Editoriales.sede} />
                                    </FormGroup>
                                </Col>
                            </Row>

                        </Tab>
                    </ Tabs >
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" onClick={guardarCambios}>Guardar</Button>
                    <Button size="sm" color="danger" onClick={cerrarModalEditoriales}>Cerrar</Button>
                </ModalFooter>
            </Modal>

        </>
    )
}
export default Editoriales;
