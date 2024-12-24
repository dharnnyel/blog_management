'use client';

import { useEffect, useState } from 'react';
import {
	getIdToken,
	getIdTokenResult,
	onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '@lib/firebaseConfig';
import { CreatePost, DeletePost, EditPost } from '@/components';

export default function AdminPage() {
	const [user, setUser] = useState<FirebaseUser | null>(
		null
	);
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<
		'create' | 'edit' | 'delete'
	>('create');
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			async user => {
				if (user) {
					setUser(user);
					const tokenResult = await getIdTokenResult(user);

					if (tokenResult.claims.role === 'admin') {
						setIsAdmin(true);
					} else {
						setIsAdmin(false);
					}
				} else {
					setUser(null);
					setIsAdmin(false);
					router.push('/admin/login');
				}
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, [router]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <div>Please log in to access this page.</div>;
	}

	if (!isAdmin) {
		return (
			<div>
				You do not have permission to access this page.
			</div>
		);
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-4'>
				Admin Dashboard
			</h1>
			<p>Welcome, {user.email}.</p>
			{/* Add admin functionalities here */}
			<div className='flex space-x-4 my-4 mb-10'>
				<button
					className={`rounded-md px-2 ${
						activeTab === 'create'
							? 'bg-blue-600'
							: 'bg-gray-200 text-black'
					}`}
					onClick={() => setActiveTab('create')}
				>
					Create Post
				</button>
				<button
					className={`rounded-md px-2 ${
						activeTab === 'edit'
							? 'bg-blue-500'
							: 'bg-gray-200 text-black'
					}`}
					onClick={() => setActiveTab('edit')}
				>
					Edit Post
				</button>
				<button
					className={`rounded-md px-2 ${
						activeTab === 'delete'
							? 'bg-blue-500'
							: 'bg-gray-200 text-black'
					}`}
					onClick={() => setActiveTab('delete')}
				>
					Delete Post
				</button>
			</div>

			<div>
				{activeTab === 'create' && <CreatePost />}
				{activeTab === 'edit' && <EditPost />}
				{activeTab === 'delete' && <DeletePost />}
			</div>
		</div>
	);
}
