import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { Store } from '../../utils/Store';
import Product from '../../models/Product';
import db from '../../utils/db';

{
	/* slug means: A slug is a human-readable, unique identifier, used 
      to identify a resource instead of a less human-readable identifier like an id.
      You use a slug when you want to refer to an item while preserving the ability 
      to see, at a glance, what the item is. 
      definition from https://itnext.io/whats-a-slug-f7e74b6c23e0 */
}
export default function ProductScreen(props) {
	const { product } = props;
	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	if (!product) {
		return <div>This product was not found.</div>;
	}

	// this is using the code from Store.js
	const addToCartHandler = async () => {
		const existItem = cart.cartItems.find((x) => x.slug === product.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countNeeded - data.countInStock < quantity) {
			alert('Thank you! We have met the need!');
		}
		// having this code allows us to add the product to the cart
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
	};

	return (
		<Layout title={product.name}>
			<div className='py-2'>
				<Link href='/'>Back to Products </Link>
			</div>
			<div className='grid md:grid-cols-4 md:gap-3	'>
				<div className=' object-center	 md:col-span-2'>
					<Image
						src={product.image}
						alt={product.name}
						width={640}
						height={640}
						layout='responsive'
						className='mb-2'
					></Image>
				</div>
				<ul className='shadow justify-center'>
					<li>
						<h1 className='text-xl rounded-md text-center text-white bg-indigo-500 shadow-md pb-3 pt-3'>
							{product.name}
						</h1>
					</li>
					<li className=' mt-1 pl-1 pt-3 pb-3 shadow font-bold text-white bg-indigo-400 rounded-lg'>
						Category: {product.category}
					</li>

					<li className=' mt-1 pl-1 pt-3 pb-3 shadow font-bold text-white bg-indigo-400 rounded-lg'>
						Goal Stock: {product.countNeeded}
					</li>
					<li className=' mt-1 pl-1 pt-3 pb-3 shadow font-bold text-white bg-indigo-400 rounded-lg'>
						Current Stock: {product.countInStock}
					</li>
					<div>
						<li className='mt-1 mb-1 pl-1 pt-3 pb-3 shadow-md w-full font-light text-white bg-indigo-400 font-sans rounded'>
							Why it&apos;s needed: {product.description}
						</li>
					</div>
				</ul>
				<div>
					<div className='card p-5 shadow-2xl'>
						<div className='mb-2 flex justify-between'>
							<div> Price </div>
							<div>${product.price}</div>
						</div>
						<button
							className='primary-button w-full'
							onClick={addToCartHandler}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;

	await db.connect();
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();
	return {
		props: {
			product: product ? db.convertDocToObj(product) : null,
		},
	};
}
