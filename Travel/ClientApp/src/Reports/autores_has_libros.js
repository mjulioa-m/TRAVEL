import { Card, CardBody, CardHeader, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component';
import React, { useEffect, useState, useContext } from "react";
import * as XLSX from "xlsx"
import { FormatMoney } from 'format-money-js'

const modeloInicio = [{
    referencia: "",
    descripcion: "",
    bodega: "",
    existencia: ""

}]

const ReporteAutores = (props) => {
    const [pendiente, setPendiente] = useState(false);
    const [autores, setAutores] = useState(modeloInicio)

    const buscar = () => {

        setPendiente(true)
        // let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        // let _fechaInicio = fechaInicio.toLocaleDateString('es-PE', options)
        // let _fechaFin = fechaFin.toLocaleDateString('es-PE', options)
        var coincidencia = ''
        const api = fetch('AutoresLibrosReportesApi')
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                var data = dataJson;
                setPendiente(false)
                if (data.length < 1) {
                    Swal.fire(
                        'Opps!',
                        'No se encontraron resultados',
                        'warning'
                    )
                }
                setAutores(data);
            }).catch((error) => {
                setAutores([]);
                Swal.fire(
                    'Opps!',
                    'No se pudo encontrar información',
                    'error'
                )
            })
    }

    const columns = [
        {
            name: 'Autor',
            selector: row => row.autor,
            sortable: true,
        },
        {
            name: 'Libro',
            selector: row => row.libro,
            sortable: true,
        },
        {
            name: 'Editorial',
            selector: row => row.editorial,
            sortable: true,
        }
    ];
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
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

    const exportarExcel = () => {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(autores);

        XLSX.utils.book_append_sheet(wb, ws, "Reporte");
        XLSX.writeFile(wb, "Reporte Autores.xlsx")
    }

    return (
        <>
            <Row>
                <Col sm={12}>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#188BAD', color: "white" }}>
                            Existencia por Bodega
                        </CardHeader>
                        <CardBody>
                            <Row className="align-items-end">
                            
                                <Col sm={3}>
                                    <FormGroup>
                                        <Button color="primary" size="sm" block onClick={buscar}>
                                            <i className="fa fa-search" aria-hidden="true"></i> Buscar
                                        </Button>
                                    </FormGroup>
                                </Col>

                                <Col sm={3}>
                                    <FormGroup>
                                        <Button color="success" size="sm" block onClick={exportarExcel}>
                                            <i className="fa fa-file-excel" aria-hidden="true"></i> Exportar
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>

                                <Col sm="12">
                                    <DataTable
                                        progressPending={pendiente}
                                        columns={columns}
                                        data={autores}
                                        customStyles={customStyles}
                                        pagination
                                        paginationComponentOptions={paginationComponentOptions}
                                    />


                                </Col>

                            </Row>

                        </CardBody>
                    </Card>
                </Col>
            </Row>


        </>
    )
}

export default ReporteAutores;
