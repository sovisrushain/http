const {pool} = require("../services/database");
const db = require("../services/database");

exports.getAllProducts = async (req, res) => {
    try {
        const result = await pool.query(
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
}

exports.createProduct = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(422).json({error: 'Name is required'});
        }
        if (!req.body.price) {
            return res.status(422).json({error: 'Price is required'});
        }
        if (!req.body.category_id) {
            return res.status(422).json({error: 'Category id is required'});
        } else {
            const existsResult = await db.pool.query({
                text: 'SELECT EXISTS (SELECT * FROM category WHERE id = $1)',
                values: [req.body.category_id]
            })
            if (!existsResult.rows[0].exists) {
                return res.status(422).json({error: 'Category id is not exists'});
            }
        }
        const result = await db.pool.query({
            text: `INSERT INTO product (name, description, price, currency, quantity, active, category_id) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            values: [
                req.body.name,
                req.body.description ? req.body.description : null,
                req.body.price,
                req.body.currency ? req.body.currency : 'LKR',
                req.body.quantity ? req.body.quantity: 0,
                'active' in req.body ? req.body.active : true,
                req.body.category_id
            ]
        })
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}