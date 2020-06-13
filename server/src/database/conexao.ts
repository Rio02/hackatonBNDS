import knex from 'knex';
import path from 'path'; //QUANDO UTILIZADO CAMINHO É PRECISO USAR PATH


const conexao = knex ({
   client:  'sqlite3', //NOME DO BD
   connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
   },
   useNullAsDefault: true,
});

export default conexao;