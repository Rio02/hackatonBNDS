import Knex from 'knex';

export async function up (knex: Knex) { 
    return knex.schema.createTable('lojas', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('categoria').notNullable();
        table.string('cnpj', 14).notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('endereco').notNullable();
        table.string('numero', 5).notNullable();
        table.string('complemento').notNullable();
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();   
        table.string('bairro').notNullable();   
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('loja');
}

