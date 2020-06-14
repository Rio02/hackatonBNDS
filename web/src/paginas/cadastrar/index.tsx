import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'; //ChangeEvent: Mudança de algum valor
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; //feathericons
import axios from 'axios';
import api from '../../services/api';

import './styles.css';

import logo from '../../imagens/logo.svg';

// Array ou objeto: manualmente informar o tipo da variavel

interface Item { //Informações dos items
    id: number;
    titulo: string;
}

interface IBGEUFResponse { //UF
    sigla: string;
}

interface IBGECidadeResponse { // CIDADE
    nome: string;
}

const Cadastrar = () => {
    const [items, setItems] = useState<Item[]>([]); //ESTADO - Armazenar informação dentro do componente
    const [ufs, setUfs] = useState<string[]>([]); ///ESTADO UF
    const [cidades, setCidades] = useState<string[]>([]);

    const [ formularioData, setFormularioData] = useState({ //CAMPOS DO FORMULARIO
        nome: '',
        categoria: '',
        cnpj: '',
        email: '',
        whatsapp: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
    });

    const [selecionadoUf, setSelecionadoUf] = useState('0');
    const [selecionadoCidade, setSelecionadoCidade] = useState('0');
    const [selecionadoItems, setSelecionadoItems] = useState<number[]>([]);
    const [selecionadoFile, setSelecionadoFile] = useState<File>();

    const history = useHistory();

    useEffect(() => {   //BUSCAR DADOS DA TABELA ITEMS
        api.get('items').then(response => { 
            setItems(response.data);
        });
    }, []);

    useEffect(() => {   // FAZER REQUISIÇÕES PARA O SERVIDOR (UF)
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufSigla = response.data.map(uf => uf.sigla);

            setUfs(ufSigla);
        });
    }, []);

    useEffect(() => {   // UF SELECIONADA PELO USUÁRIO ESCOLHER CIDADE
        
        if (selecionadoUf === '0') { // carregar as cidades sempre que a UF mudar
            return;
        }

        axios.get<IBGECidadeResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selecionadoUf}/municipios`)
        .then(response => {
            const nomesCidade = response.data.map(cidade => cidade.nome);

            setCidades(nomesCidade);
        });
    },[selecionadoUf]);
    
    function lidarcomSelecaoUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelecionadoUf(uf);
    }

    function lidarcomSelecaoCidade(event: ChangeEvent<HTMLSelectElement>) {
        const cidade = event.target.value;

        setSelecionadoCidade(cidade);
    }

    function lidarcomMudancadeEntrada(event: ChangeEvent<HTMLInputElement>) { //Entrada de dados no Input
        const { name, value } = event.target; //

        setFormularioData({ ...formularioData, [name]: value }); //...formularioData Copiar tudo oq tem dentro do objeto
    }

    function manipularSelecionarItem(id: number) { // MARCA E DESMARCA ITEM
        const jaSelecionado = selecionadoItems.findIndex(item => item === id);

        if(jaSelecionado >= 0) {
            const itemsFiltrado = selecionadoItems.filter(item => item !== id);

            setSelecionadoItems(itemsFiltrado);
        } else {
            setSelecionadoItems([ ...selecionadoItems, id ]);
        }
    }

    async function manipularEnvio(event: FormEvent) {  //ENVIO PARA API
        event.preventDefault();

        const { nome, categoria, cnpj, email, whatsapp, endereco, numero, complemento, bairro  } = formularioData;
        const uf = selecionadoUf;
        const cidade = selecionadoCidade;
        const items = selecionadoItems;

        const data = {
        nome,
        categoria,
        cnpj,
        email,
        whatsapp,
        endereco,
        numero,
        complemento,
        uf,
        cidade,
        bairro,
        items
        };    

        await api.post('cadastro', data);

        alert('Cadastro criado com sucesso!');

        history.push('/');
    }

    return (
        <div id="cadastrar-pagina">
            <header>
                <img src={logo} alt="CompraComigo"/>
            </header>

            <form onSubmit={manipularEnvio}>
                <h1>Cadastrar</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="nome">Nome do comércio</label>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            onChange={lidarcomMudancadeEntrada}
                        />
                    </div>
                    
                    <div className="field-group">
                    <div className="field">
                            <label htmlFor="categoria">Categoria* (Tipo de comércio)</label>
                            <input
                                type="text"
                                name="categoria"
                                id="categoria"
                                onChange={lidarcomMudancadeEntrada}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input
                                type="text"
                                name="cnpj"
                                id="cnpj"
                                onChange={lidarcomMudancadeEntrada}
                            />
                        </div>
                     </div>
                    <div className="field-group">
                        <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={lidarcomMudancadeEntrada}
                        />
                        </div>

                        <div className="field">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <input
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                            onChange={lidarcomMudancadeEntrada}
                        />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="endereco">Endereço</label>
                        <input
                            type="text"
                            name="endereco"
                            id="endereco"
                            onChange={lidarcomMudancadeEntrada}
                        />
                    </div>
                    <div className="field-group">
                    <div className="field">
                        <label htmlFor="numero">Número</label>
                        <input
                            type="text"
                            name="numero"
                            id="numero"
                            onChange={lidarcomMudancadeEntrada}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="complemento">Complemento</label>
                        <input
                            type="text"
                            name="complemento"
                            id="complemento"
                            onChange={lidarcomMudancadeEntrada}
                        />
                    </div>
                    </div>
                    
                    <div className="field">
                        <label htmlFor="complemento">Bairro</label>
                        <input
                            type="text"
                            name="bairro"
                            id="bairro"
                            onChange={lidarcomMudancadeEntrada}
                        />
                        <option value="0">Exemplo: Campo Grande</option>
                        </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                            name="uf" 
                            id="uf" 
                            value={selecionadoUf} 
                            onChange={lidarcomSelecaoUf}
                            >
                            <option value="0">Selecione uma UF</option>   
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <select 
                                name="cidade" 
                                id="cidade"
                                value={selecionadoCidade}
                                onChange={lidarcomSelecaoCidade}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {cidades.map(cidade => (
                                    <option key={cidade} value={cidade}>{cidade}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Quais ítens você vende?</h2>
                        <span>Selecione um ou mais</span>
                    </legend>
                    
                    <ul className="items-grid">  {/*Varredura no array*/}
                        {items.map(item => {    
                            return(
                            <li key={item.id} 
                            onClick={() => manipularSelecionarItem(item.id)}
                            className={selecionadoItems.includes(item.id) ? 'selecionado' : ''}
                            >
                                <span>{item.titulo}</span>
                            </li>
                            );
                        })}
                        
                    </ul>
                </fieldset>

                <div className="field-group">                    
                    <button type="submit">
                    <Link to="/">
                        <strong>Sair</strong>
                    </Link>
                    </button>
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Cadastrar;