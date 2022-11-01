import React from 'react';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

//

function CartScreen() {
	const router = useRouter();

	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	const removeItemHandler = (item) => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
	};

	const updateCartHandler = async (item, qty) => {
		const quantity = Number(qty);
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countNeeded - data.countInStock < quantity) {
			return toast.error('We have met the need! Thank you for your donation!');
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
	};

	return (
		<Layout title='Shopping Cart'>
			<h1 className='mb-4 text-xl '> Shopping Cart </h1>
			{cartItems.length === 0 ? (
				<div>
					Your cart is currently empty.{' '}
					<Link href='/'> Back to Donations </Link>
				</div>
			) : (
				<div className='grid md:grid-cols-4 md:gap-5'>
					<div className='overflow-x-auto md:col-span-3'>
						<table className='min-w-full'>
							<thead className='border-b'>
								<tr>
									<th className='px-5 text-left '>Item</th>
									<th className='p-5 text-right'>Quantity</th>
									<th className='p-5 text-right'>Price</th>
									<th className='p-5'>Action</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item) => (
									<tr key={item.slug} className='border-b'>
										<td>
											<Link href={`/product/${item.slug}`} />
											<a className='flex items-center'>
												<Image
													src={item.image}
													alt={item.name}
													width={50}
													height={50}
												></Image>
												{/* below makes a space */}
												&nbsp; {item.name}
											</a>
										</td>
										<td className='p-5 text-right'>
											<select
												value={item.quantity}
												onChange={(e) =>
													updateCartHandler(item, e.target.value)
												}
											>
												{[
													...Array(item.countNeeded - item.countInStock).keys(),
												].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										</td>
										<td className='p-5 text-right'>${item.price}</td>
										<td className='p-5 text-center'>
											<button onClick={() => removeItemHandler(item)}>
												<XCircleIcon className='w-5 h-5 text-red-500' />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className='card p-5'>
						<ul>
							<li>
								<div className='pb-3 text-lg'>
									Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
									{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
								</div>
							</li>
							<li>
								<button
									className='primary-button w-full p-2'
									onClick={() => router.push('login?redirect=/shipping')}
								>
									Proceed to Checkout
								</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
