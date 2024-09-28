import { sql } from './db.js'
import { randomUUID } from 'crypto'

export class Database {

    //COLABORADORES

    async buscarColaboradorPorId(id) {
        const colaborador = await sql`SELECT * FROM colaboradores WHERE id = ${id}`;
        if (colaborador.length > 0) {
            return colaborador;
        } else {
            return false;
        }
    }

    async listarColaboradores() {
        const colaboradores = await sql`select * from colaboradores`
        return colaboradores;
    }

    async criarColaborador(colaborador) {
        const id = randomUUID()
        await sql`INSERT INTO colaboradores (id, nome, senha)
        values (${id}, ${colaborador.nome}, ${colaborador.senha})`

        const colaboradores = await sql`select * from colaboradores`
        return colaboradores;
    }

    async editarColaborador(id, colaborador) {
        await sql`UPDATE colaboradores SET
        nome = ${colaborador.nome},
        senha = ${colaborador.senha}
        where id = ${id}`
    }

    async deletarColaborador(id) {
        await sql`DELETE from colaboradores where id = ${id}`
    }


    // EPIS (EQUIPAMENTOS)


    // ENDPOINTS de EPIs
    async listarEpis() {
        const epis = await sql`SELECT * FROM epis`;
        return epis;
    }

    async criarEpi(epi) {
        const id = randomUUID();

        await sql`INSERT INTO epis (id, nome, descricao, tipo, colaborador_que_pegou_emprestado) VALUES (
            ${id}, ${epi.nome}, ${epi.descricao}, ${epi.tipo}, ${epi.colaborador_que_pegou_emprestado})`;
    }

    async atualizarEpi(id, epi) {
        const nome = epi.nome;
        const descricao = epi.descricao;
        const tipo = epi.tipo;
        const emprestado = epi.emprestado;
        const colaborador_que_pegou_emprestado = epi.colaborador_que_pegou_emprestado; 

        await sql`UPDATE epis SET 
            nome = ${nome}, 
            descricao = ${descricao}, 
            tipo = ${tipo}, 
            emprestado = ${emprestado}, 
            colaborador_que_pegou_emprestado = ${colaborador_que_pegou_emprestado} 
        WHERE id = ${id}`;
    }

    async deletarEpi(id) {
        await sql`DELETE FROM epis WHERE id = ${id}`;
    }

}