import React, { useEffect, useState, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Button } from "reactstrap";
import { FormatMoney } from 'format-money-js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const data_inicio_donut = {
    labels: ['Sin resultados'],
    datasets: [
        {
            data: [0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
        },
    ],
};


const data_inicio_bar = {
    labels: ['Sin resultados'],
    datasets: [
        {
            label: 'Cantidad',
            data: [0],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const Autores = (props) => {

    const [config, setConfig] = useState({})
    const [dataDonut, setDataDonut] = useState(data_inicio_donut)
    const [dataBar, setDataBar] = useState(data_inicio_bar)
    const [fm2, setfm2] = useState(new FormatMoney({ symbol: '', decimals: 2 }));

    const optionsBar = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };
    const obtenerConfiguracion = () => {
        const api = fetch('AutoresLibrosReportesApi/cantidad')
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                let d = dataJson;

                let lblsBar = d.map((item) => { return item.autores })
                let dtaBar = d.map((item) => { return item.libros })
                let lblsDonut = d.map((item) => { return item.autores })
                let dtaDonut = d.map((item) => { return item.libros })
                let modeloBar = {
                    labels: lblsBar,
                    datasets: [
                        {
                            label: 'Libros',
                            data: dtaBar,
                            backgroundColor: '#FF5738',
                        }
                    ]
                };

                let modeloDonut = {
                    labels: lblsDonut,
                    datasets: [
                        {
                            data: dtaDonut,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1
                        },
                    ],
                }

                if (d.length < 1)
                    setDataBar(data_inicio_bar)
                else
                    setDataBar(modeloBar)

                if (d.length < 1)
                    setDataDonut(data_inicio_donut)
                else
                    setDataDonut(modeloDonut)

                setConfig(d)
            }).catch((error) => {
                console.log("error")
            })

    }
    const totallibros = () => {
        var tot = 0
        for (let i = 0; i < config.length; i++) {
            const element = config[i];
            tot = tot + element.libros
        }
        return tot
    }
    useEffect(() => {
        obtenerConfiguracion()
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Cantidades</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{fm2.from(totallibros())}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-shopping-basket fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>
            <Button onClick={() => { obtenerConfiguracion() }}></Button>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between " style={{ background: '#188BAD' }} >
                            <h6 className="m-0 font-weight-bold text-white">Existencias</h6>

                        </div>
                        <div className="card-body">
                            <div style={{ height: 350 }}>
                                <Bar options={optionsBar} data={dataBar} />
                            </div>

                        </div>
                    </div>
                </div>
                 <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between " style={{background:'#188BAD'}}>
                            <h6 className="m-0 font-weight-bold text-white">Productos más vendidos</h6>
                          
                        </div>
                        <div className="card-body">
                            <div style={{ height: 350 }}>
                                <Doughnut options={optionsBar} data={dataDonut} />
                            </div>
                            
                        </div>
                    </div>
                </div> 


            </div>
        </>
    )
}

export default Autores;