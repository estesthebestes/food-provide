import Product from '../../../models/Product';
import db from '../../../utils/db';

// this code is to get the product by id from the database
const handler = async (req, res) => {
	await db.connect();
	const product = await Product.findById(req.query.id);
	await db.disconnect();
	res.send(product);
};

export default handler;
