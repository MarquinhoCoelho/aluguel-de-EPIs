import { sql } from './db.js'
import { randomUUID } from 'crypto'

export class Database {

    // ENDPOINTS de COLABORADORES
    async pegarColaborador(nome) {
        const user = await sql`SELECT * FROM colaboradores WHERE nome = ${nome}`;
        if (user.length > 0) {
            return user;
        } else {
            return false;
        }
    }

    async listarColaboradores() {
        
        const colaboradores = await sql`SELECT * FROM colaboradores`;
        return colaboradores;
    }

    async criarColaborador(colaborador) {
        const id = randomUUID();
        const nome = colaborador.nome;
        const senha = colaborador.senha;
        
        await sql`INSERT INTO colaboradores (id, nome, senha) VALUES (${id}, ${nome}, ${senha})`;
    }

    async atualizarColaborador(id, colaborador) {
        const nome = colaborador.nome;
        const senha = colaborador.senha;

        await sql`UPDATE colaboradores SET 
            nome = ${nome}, 
            senha = ${senha} 
        WHERE id = ${id}`;
    }

    async deletarColaborador(id) {
        await sql`DELETE FROM colaboradores WHERE id = ${id}`;
    }

    // ENDPOINTS de EPIs
    async listarEpis() {
        const epis = await sql`SELECT * FROM epis`;
        return epis;
    }

    async criarEpi(epi) {
        const id = randomUUID();
        const nome = epi.nome;
        const descricao = epi.descricao;
        const tipo = epi.tipo;
        
        await sql`INSERT INTO epis (id, nome, descricao, tipo) VALUES (${id}, ${nome}, ${descricao}, ${tipo})`;
    }

    async atualizarEpi(id, epi) {
        const nome = epi.nome;
        const descricao = epi.descricao;
        const tipo = epi.tipo;
        const emprestado = epi.emprestado;
        const colaboradorQuePegouEmprestado = epi.colaboradorQuePegouEmprestado;

        await sql`UPDATE epis SET 
            nome = ${nome}, 
            descricao = ${descricao}, 
            tipo = ${tipo}, 
            emprestado = ${emprestado}, 
            colaboradorQuePegouEmprestado = ${colaboradorQuePegouEmprestado} 
        WHERE id = ${id}`;
    }

    async deletarEpi(id) {
        await sql`DELETE FROM epis WHERE id = ${id}`;
    }
}
