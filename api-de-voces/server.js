import { fastify } from "fastify";
import { Database } from "./database.js"
import cors from '@fastify/cors'

const servidor = fastify();
const database = new Database;

servidor.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// COLABORADORES

servidor.get('/colaboradores', async () => {
    return await database.listarColaboradores();
})

servidor.get('/colaborador/:id', async (request) => {
    const colaborador = await database.buscarColaboradorPorId(request.params.id);
    if (colaborador) {
        return colaborador;
    } else {
        return false;
    }
});

servidor.post('/colaborador', async (request) => {
    return await database.criarColaborador(request.body);
})

servidor.put('/colaborador/:id', async (request) => {
    return await database.editarColaborador(request.params.id, request.body);
})

servidor.delete('/colaborador/:id', async (request) => {
    return await database.deletarColaborador(request.params.id);
})


// EPIS (EQUIPAMENTOS)



servidor.get('/epis', async () => {
    const epis = await database.listarEpis();
    return epis;
});

servidor.post('/epi', async (request) => {
    return await database.criarEpi(request.body);
});

servidor.put('/epi/:id', async (request, reply) => {
    const idEpi = request.params.id;
    const body = request.body;
    await database.atualizarEpi(idEpi, body);
    return reply.status(204).send();
});

servidor.delete('/epi/:id', async (request, reply) => {
    const idEpi = request.params.id;
    await database.deletarEpi(idEpi);
    return reply.status(204).send();
});

servidor.listen({
    port: 3333
})
