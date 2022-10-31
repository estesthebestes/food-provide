import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

export default function LoginScreen() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitHandler = ({ email, password }) => {};

	return (
		<Layout>
			<form
				className='mx-auto max-w-screen-md'
				onSubmit={handleSubmit(submitHandler)}
			>
				<h1 className='mb-4 text-xl'> Login </h1>
				<div className='mb-4'>
					<label htmlFor='email'> Email </label>
					<input
						type='email'
						// requirements for email
						{...register('email', {
							required: 'Enter Email',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						})}
						className='w-full'
						id='email'
						autoFocus
					></input>
					{errors.email && (
						<div className='text-indigo-600 underline'>
							{errors.email.message}
						</div>
					)}
				</div>
				<div className='mb-4'>
					<label htmlFor='password'> Password </label>
					<input
						type='password'
						// requirements for passwords
						{...register('password', {
							required: 'Enter Password',
							minLength: {
								value: 8,
								message:
									'Password must be at least 8 characters. A longer password significantly improves security.',
							},
						})}
						className='w-full'
						id='password'
						autoFocus
					></input>
					{errors.password && (
						<div className='text-indigo-600 underline'>
							{errors.password.message}
						</div>
					)}
				</div>
				<div className='mb-4'>
					<button className='primary-button'> Login</button>
				</div>
				<div className='mb-4'>
					Need an account? &nbsp;
					<Link href='/register'> Register</Link>
				</div>
			</form>
		</Layout>
	);
}
