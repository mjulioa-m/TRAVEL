import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App';
//import NotFound from './views/NotFound';

const root = document.getElementById('wrapper');

ReactDOM.render(
    <BrowserRouter>
        <Routes>

            {/*ACONTINUACION ESTABLECEMOS LAS RUTAS DE NUESTRO SISTEMA*/}

            {/*Permite anidar rutas en base a una*/}
            <Route path='/' element={<App />}>

            </Route>
            {/*<Route path='*' element={<NotFound />} />*/}

        </Routes>
    </BrowserRouter>
    , root);


