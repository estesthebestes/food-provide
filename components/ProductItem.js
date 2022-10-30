import Link from 'next/link';
import React from 'react';

// this is the product item component, it is the base styling for all of the items that are going to be sold on the website
export default function ProductItem({ product }) {
	return (
		<div className='card'>
			{/* slug means: A slug is a human-readable, unique identifier, used 
      to identify a resource instead of a less human-readable identifier like an id.
      You use a slug when you want to refer to an item while preserving the ability 
      to see, at a glance, what the item is. 
      definition from https://itnext.io/whats-a-slug-f7e74b6c23e0 */}
			<Link href={`/product/${product.slug}`}>
				<img
					src={product.image}
					alt={product.name}
					className='rounded shadow'
				></img>
			</Link>
			<div className='flex flex-col items-center justify-center p-5'>
				<Link href={`/product/${product.slug}`}>
					<h2 className='text-lg'>{product.name}</h2>
				</Link>
				<p className='mb-2'>{product.brand}</p>
				<p>${product.price}</p>
				<button className='primary-button' type='button'>
					Add to Cart
				</button>
			</div>
		</div>
	);
}