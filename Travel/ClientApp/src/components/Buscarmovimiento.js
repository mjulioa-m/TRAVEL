import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { InputGroup, Table, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, ModalFooter, Row, Col } from "reactstrap"
import Swal from 'sweetalert2'

const modeloCategoria = {
    idCategoria: 0,
    descripcion: "",
    esActivo: true
}

const Buscar = (props) => {

    const [categoria, setCategoria] = useState(modeloCategoria);
    const [pendiente, setPendiente] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [verModal, setVerModal] = useState(false);
    const [seleccionado, setseleccionado] = useState('');

    const abrirEditarModal = (data) => {
        setCategoria(data);
        setVerModal(!verModal);
    }

    const cerrarModal = () => {
        setCategoria(modeloCategoria)
        setVerModal(!verModal);
    }
    const guardarCambios = () => {
        setVerModal(!verModal);
    }



    return (
        <>

            <Modal size={(props.tamaño == "sm") ? "sm" : "lg"} isOpen={props.verModal}>
                <ModalHeader style={{ backgroundColor: '#188BAD', color: 'white' }} >
                    {props.tituloencabezado}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm={12}>
                            <FormGroup>
                                <InputGroup>
                                    <Input bsSize="sm" name="departamento" id={'busquedaempresasmaestrousuario'} onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                            props.filtrar(document.getElementById('busquedaempresasmaestrousuario').value)

                                        }
                                    }} />
                                    <Button color="primary" size="sm" className="mr-2"
                                        onClick={() => {
                                            props.filtrar(document.getElementById('busquedaempresasmaestrousuario').value)


                                        }}
                                    >
                                        <i className="fas fa-pen-alt"></i>
                                    </Button>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                            <div className="table-responsive"  style={{ height: '300px' }}>


                                <Table striped size={(props.tamaño == "sm") ? "sm" : "lg"} >
                                    <thead>
                                        <tr>
                                            {
                                                props.encabezado.map((item, index) => (
                                                    <th>{item}</th>
                                                ))
                                            }

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (props.busqueda.length < 1) ? (
                                                <tr>
                                                    <th >
                                                        No hay datos

                                                    </th>
                                                </tr>
                                            ) :
                                                (
                                                    props.busqueda.map((item, index) => (
                                                        <tr onClick={() => {
                                                            console.log(props.busqueda[index][props.codigo])
                                                            setseleccionado(props.busqueda[index])
                                                        }} style={(props.busqueda[index] != seleccionado) ? { backgroundColor: '#D9E3FB' } : { backgroundColor: '#5382F3' }} key={(index + 1)}>

                                                            {
                                                                (props.codigo != "") && <th >
                                                                    <a style={{ color: 'black' }} href="#">{props.busqueda[index][props.sub][props.codigo]}</a>

                                                                </th>
                                                            }
                                                            {
                                                                (props.nombre != "") && <th >
                                                                    <a style={{ color: 'black' }} href="#">{props.busqueda[index][props.sub][props.nombre]}</a>


                                                                </th>
                                                            }
                                                            {(props.dato != "") && <th >
                                                                <a style={{ color: 'black' }} href="#">{props.busqueda[index][props.sub][props.dato]}</a>


                                                            </th>}
                                                            {(props.dato2 != "") && <th >
                                                                <a style={{ color: 'black' }} href="#">{props.busqueda[index][props.sub][props.dato2]}</a>

                                                            </th>}
                                                            {(props.dato3 != "") && <th >
                                                                <a style={{ color: 'black' }} href="#">{props.busqueda[index][props.sub][props.dato3]}</a>

                                                            </th>}
                                                        </tr>
                                                    ))
                                                )


                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Col>

                    </Row>





                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" onClick={() => { props.seleccionar(seleccionado) }}>Seleccionar</Button>
                    <Button size="sm" color="danger" onClick={() => { props.cerrarModal() }}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </>



    )
}

export default Buscar;