import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { titulo: 'Camisas'},
        { titulo: 'Tênis'},
        { titulo: 'Calças'},
        { titulo: 'Shorts'},
        { titulo: 'Chinelos'},
        { titulo: 'Bonés'},
        { titulo: 'Relógios'},
        { titulo: 'Aneis'},
        { titulo: 'Mochilas'},
        { titulo: 'Bolsas'},
        { titulo: 'Brincos'},
        { titulo: 'Frutas'},
        { titulo: 'Verduras'},
        { titulo: 'Cereais'},
        { titulo: 'Lanches'},
        { titulo: 'Bebidas Alcoólicas'},
        { titulo: 'Refrigerantes'},
        { titulo: 'Biscoitos'},
        { titulo: 'Produtos de Limpeza'},
        { titulo: 'Produtos de Higiene'},
        { titulo: 'Alimentos desnatado'},
        { titulo: 'Alimentos integral'},
        { titulo: 'Remédios'}
    ])
}