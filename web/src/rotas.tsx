import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './paginas/Home';
import Cadastrar from './paginas/cadastrar';
import Detalhe from './paginas/detalhe';
import Cadastros from './paginas/cadastros';

const Rotas = () => {
    return (
        <BrowserRouter>
        <Route component={Home} path="/" exact />
        <Route component={Cadastrar} path="/cadastrar" />
        </BrowserRouter>
    );
}

export default Rotas;