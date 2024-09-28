import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { Database } from './database.js'

const server = fastify();
const database = new Database;


// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS de colaboradores

server.get('/colaboradores', async () => {
    const colaboradores = await database.listarColaboradores();
    return colaboradores;
});


server.get('/colaborador/:nome', async (request) => {
    const nomeColaborador = request.params.nome;
    const existe = await database.pegarColaborador(nomeColaborador);
    return existe;
});

server.post('/colaborador', async (request, reply) => {
    const body = request.body;
    await database.criarColaborador(body);
    return reply.status(201).send();
})

server.put('/colaborador/:id', async (request, reply) => {
    const idColaborador = request.params.id;
    const body = request.body;
    await database.atualizarColaborador(idColaborador, body);

    return reply.status(204).send();
})

server.delete('/colaborador/:id', async (request, reply) => {
    const idColaborador = request.params.id;
    await database.deletarColaborador(idColaborador);

    return reply.status(204).send();
})

// ENDPOINTS de EPIs

server.get('/epis', async () => {
    const epis = await database.listarEpis();
    return epis;
});

server.post('/epi', async (request, reply) => {
    const body = request.body;
    await database.criarEpi(body);
    return reply.status(201).send();
});

server.put('/epi/:id', async (request, reply) => {
    const idEpi = request.params.id;
    const body = request.body;
    await database.atualizarEpi(idEpi, body);
    return reply.status(204).send();
});

server.delete('/epi/:id', async (request, reply) => {
    const idEpi = request.params.id;
    await database.deletarEpi(idEpi);
    return reply.status(204).send();
});


server.listen({
    port: 3333
});