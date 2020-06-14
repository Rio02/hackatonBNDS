import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiLogIn, FiArrowRight } from 'react-icons/fi'; //feathericons
import { Link } from 'react-router-dom';
import Picker from 'emoji-picker-react'; //Emoji

import './styles.css';

import logo from '../../imagens/logo.svg';

interface IBGEUFResponse { //UF
    sigla: string;
}

const Home = () => {
    const [ufs, setUfs] = useState<string[]>([]); ///ESTADO UF

    useEffect(() => {   // FAZER REQUISIÇÕES PARA O SERVIDOR (UF)
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufSigla = response.data.map(uf => uf.sigla);

            setUfs(ufSigla);
        });
    }, []);

    return (
        <div id="page-home">
            <div className="content">
                <header>
                <img src={logo} alt="CompraComigo" />
                </header>

                <main>
                   
                    <p>Encontre estabelecimento mais proximo a você :)</p>

                    <p>
                    [ESTADO]
                    </p>

                    <p>
                    [CIDADE]
                    </p>

                    <Link to="/cadastras">
                        <span>
                            <FiArrowRight />
                        </span>
                        <strong>
                            Acessar
                        </strong>
                    </Link>
                    <Link to="/cadastrar">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>
                            Cadastrar Comércio
                        </strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;