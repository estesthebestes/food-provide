import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

// this is the product item component, it is the base styling for all of the items that are going to be sold on the website
export default function ProductItem({ product, addToCartHandler }) {
	return (
		<div className='card '>
			{/* slug means: A slug is a human-readable, unique identifier, used 
      to identify a resource instead of a less human-readable identifier like an id.
      You use a slug when you want to refer to an item while preserving the ability 
      to see, at a glance, what the item is. 
      definition from https://itnext.io/whats-a-slug-f7e74b6c23e0 */}
			<Link href={`/product/${product.slug}`}>
				<Image
					src={product.image}
					alt={product.name}
					className='rounded shadow'
					width={600}
					height={600}
				></Image>
			</Link>
			{/* in this, using product. ***** is getting the products from our databse and using them to populate the cards according to the styling below */}
			<div className='flex flex-col items-center justify-center p-5'>
				<Link href={`/product/${product.slug}`}>
					<h2 className='text-lg'>{product.name}</h2>
				</Link>
				<p className='mb-2'>{product.brand}</p>
				<p>${product.price}</p>
				{/* this button should add the product to the cart of the user */}
				<button
					className='primary-button'
					type='button'
					onClick={() => addToCartHandler(product)}
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
}
