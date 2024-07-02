const express = require('express');
const db = require('./services/database');

const app = express();

app.get('/categories', async (req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM category');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
})

app.get('/products', async (req, res) => {
    try {
        const result = await db.pool.query(
            `SELECT p.id, p.name, p.description, p.price, p.currency, 
                    p.quantity, p.active, p.created_date, p.updated_date,
                    (SELECT ROW_TO_JSON(category_obj) FROM (
                        SELECT id, name FROM category WHERE id = p.category_id
                    ) category_obj) AS category
            FROM product p`
        );
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
})

app.listen(3000, () => console.log('Listening on port 3000'));
