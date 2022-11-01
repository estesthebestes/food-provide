import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { Store } from '../../utils/Store';
import Product from '../../models/Product';
import db from '../../utils/db';
import { useState } from 'react';
import { useEffect } from 'react';

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

	const router = useRouter();
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
			<div className='grid md:grid-cols-4 md:gap-3'>
				<div className='md:col-span-2'>
					<Image
						src={product.image}
						alt={product.name}
						width={640}
						height={640}
						layout='responsive'
					></Image>
				</div>
				<ul>
					<li>
						<h1 className='.text-lg'>{product.name}</h1>
					</li>
					<li>Category: {product.category}</li>
					<li>Brand: {product.brand}</li>
					<li>Goal Stock: {product.countNeeded}</li>
					<li>Current Stock: {product.countInStock}</li>
					<li>Why it's needed: {product.description}</li>
				</ul>
				<div>
					<div className='card p-5'>
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
