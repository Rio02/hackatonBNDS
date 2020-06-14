import express, { request, response } from 'express';
import knex from './database/conexao';

const rotas = express.Router();

rotas.get('/items', async (request, response) => { //LISTAR ITEMS
    // SELECT * FROM items
    const items = await knex('items').select('*'); 
    
    const serializacaoItems = items.map(item => { 
        return {
            id: item.id,
            titulo: item.titulo,
        };
    });

    return response.json(serializacaoItems);
});

rotas.post('/cadastro', async (request, response) => { //CRINADO UM CADASTRO DE LOJA
    const {
        nome,
        categoria,
        cnpj,
        email,
        whatsapp,
        endereco,
        numero,
        complemento,
        cidade,
        uf,
        bairro,
        items
    } = request.body;

    const trx = await knex.transaction(); 

    const loja = {
        nome,
        categoria,
        cnpj,
        email,
        whatsapp,
        endereco,
        numero,
        complemento,
        cidade,
        uf,
        bairro
    }

    //Retorna id 
    const idsInserido = await trx('lojas').insert(loja);  //NOVO LOCAL DE CADASTRO

    const loja_id = idsInserido[0];

    const lojaItems = items.map((item_id: Number) => {
        return {
            item_id,
            loja_id,
        }
    }) 

    await trx('loja_items').insert(lojaItems); //RELACIONAMENTO COM TABELA ITEMS

    await trx.commit();

    return response.json({
        id: loja_id,
        ...loja,
    })
}); 

rotas.get('/cadastro/:id', async (request, response) => { //LISTAR LOJA ESPECÍFICA
    const id = request.params.id;

    const loja = await knex('lojas').where('id', id).first();

    if(!loja) {
        return response.status(400).json({ mensagem: 'INFORMAÇÃO INCORRETA TENTE NOVAMENTE!'});
    }

    const items = await knex('items') //Listar da tabala
    .join('loja_items', 'items.id', '=', 'loja_items.item_id') .where('loja_items.loja_id', id)
    .select('items.titulo');

    return response.json({ loja, items });
});

rotas.get('/cadastro', async (request, response) => { //FILTRANDO CIDADE,ESTADO,ITEMS
    const { cidade, uf, bairro, items } = request.query;

    const analisandoItems = String(items).split(',').map(item => Number(item.trim()));

    const lojas = await knex('lojas')
    .join('loja_items', 'lojas.id', '=', 'loja_items.loja_id')
    .whereIn('loja_items.item_id', analisandoItems)
    .where('cidade', String(cidade))
    .where('uf', String(uf))
    .where('bairro', String(bairro))
    .distinct()
    .select('lojas.*');

    return response.json(lojas)
});

export default rotas; 