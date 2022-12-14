import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getError } from '../utils/error';

export default function LoginScreen() {
	// our react hook to get the users session data
	const { data: session } = useSession();

	const router = useRouter();

	const { redirect } = router.query;

	// used for redirections based on the users session
	useEffect(() => {
		if (session?.user) {
			router.push(redirect || '/');
		}
	}, [router, session, redirect]);

	// we use this to handle the form data below for login
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// this is code to handle the sign in with email and password when the user enters it and checks for errors
	const submitHandler = async ({ email, password }) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};

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
