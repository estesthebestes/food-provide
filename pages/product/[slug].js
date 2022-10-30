import { userRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';

{
	/* slug means: A slug is a human-readable, unique identifier, used 
      to identify a resource instead of a less human-readable identifier like an id.
      You use a slug when you want to refer to an item while preserving the ability 
      to see, at a glance, what the item is. 
      definition from https://itnext.io/whats-a-slug-f7e74b6c23e0 */
}
export default function ProductScreen() {
	const { query } = useRouter();
	return <Layout title={product.name}></Layout>;
}
