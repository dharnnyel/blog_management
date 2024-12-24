'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@lib/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	interface HandleLoginEvent
		extends React.FormEvent<HTMLFormElement> {}

	const handleLogin = async (
		e: HandleLoginEvent
	): Promise<void> => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			router.push('/admin');
		} catch (error) {
			setError(
				'Failed to log in. Please check your credentials.'
			);
		}
	};

	return (
		<div className='container mx-auto p-4 space-y-16 text-center'>
			<h1 className='text-3xl font-bold mb-4'>
				Admin Login
			</h1>
			<form
				onSubmit={handleLogin}
				className='flex flex-col items-center gap-10'
			>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					className='border-2 outline-none bg-transparent border-blue-500 w-1/2 rounded-xl px-3 py-2 placeholder:text-gray-500'
					required
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='border-2 outline-none bg-transparent border-blue-500 w-1/2 rounded-xl px-3 py-2 placeholder:text-gray-500'
					required
				/>
				{error && <p className='text-red-500'>{error}</p>}
				<button
					type='submit'
					className='w-60 bg-blue-600 py-3 rounded-2xl'
				>
					Login
				</button>
			</form>
		</div>
	);
}
