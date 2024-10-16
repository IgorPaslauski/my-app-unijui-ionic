const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config(); // Para carregar variáveis de ambiente

const app = express();
const port = process.env.PORT || 8080;

// libera os cors
app.use(cors());

// Configurações do PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ClassRoom',
    password: '123456',
    port: 5432,
});

const tratarErroConexao = async (req, res, callback) => {
    try {
        await callback(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    };
};

app.use(express.json());

app.get('/teste', async (req, res) => {

    res.json([{tet:'testeee'}]);

});

// Rota para listar usuários
app.get('/usuarios', async (req, res) => {
    tratarErroConexao(req, res, async () => {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    });
});

app.get('/usuario/:id', async (req, res) => {
    tratarErroConexao(req, res, async () => {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        res.json(result.rows[0] || {});
    });
});

app.get('/aulas', async (req, res) => {
    tratarErroConexao(req, res, async () => {
        const result = await pool.query(`
            SELECT 
                AULAS.id
            FROM aulas 
            WHERE curso_id = 1
            order by ordem
            `);
        res.json(result.rows);
    });
});

app.get('/aula/:id', async (req, res) => {
    tratarErroConexao(req, res, async () => {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM aulas WHERE id = $1', [id]);
        res.json(result.rows[0] || {});
    });
});

app.get('/tarefas/:id', async (req, res) => {
    tratarErroConexao(req, res, async () => {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT 
                *
            FROM tarefas 
            WHERE aula_id = $1
            `, [id]);
        res.json(result.rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
