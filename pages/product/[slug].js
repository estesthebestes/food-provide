import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

{
	/* slug means: A slug is a human-readable, unique identifier, used 
      to identify a resource instead of a less human-readable identifier like an id.
      You use a slug when you want to refer to an item while preserving the ability 
      to see, at a glance, what the item is. 
      definition from https://itnext.io/whats-a-slug-f7e74b6c23e0 */
}
export default function ProductScreen() {
	const { query } = useRouter();
	const { slug } = query;
	// x => x.slug === slug is a function that returns true if the slug of the product is equal to the slug of the query
	const product = data.products.find((x) => x.slug === slug);
	if (!product) {
		return <div>This product was not found. </div>;
	}
	return (
		<Layout title={product.name}>
			<div className='py-2'>
				<Link href='/'>Back to Products </Link>
			</div>
		</Layout>
	);
}
