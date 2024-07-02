const db = require("../services/database");

exports.getAllCategories = async (req, res) => {
    try {
        const result = await db.pool.query('SELECT * FROM category');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}
exports.createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(422).json({error: "Name is required"});
        }
        const existsResult = await db.pool.query({
            text: 'SELECT EXISTS (SELECT * FROM category WHERE name = $1)',
            values: [req.body.name]
        });
        if (existsResult.rows[0].exists) {
            console.log(existsResult.rows[0].exists);
            return res.status(409).json({error: `Category name: ${req.body.name} is already exists`});
        }
        const result = await db.pool.query({
            text: 'INSERT INTO category (name) VALUES ($1) RETURNING *',
            values: [req.body.name]
        })
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}