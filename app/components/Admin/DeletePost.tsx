'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@lib/firebaseConfig';
import {
	collection,
	getDocs,
	doc,
	deleteDoc,
} from 'firebase/firestore';

type Post = {
	id: string;
	title: string;
	content: string;
};

const DeletePost = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [selectedPost, setSelectedPost] =
		useState<Post | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchPosts = async () => {
			const querySnapshot = await getDocs(
				collection(db, 'posts')
			);
			const postsData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			})) as Post[];
			setPosts(postsData);
		};

		fetchPosts();
	}, []);

	const handlePostClick = (post: Post) => {
		setSelectedPost(post);
	};

	const handleDelete = async () => {
		if (selectedPost) {
			try {
				const postRef = doc(db, 'posts', selectedPost.id);
				await deleteDoc(postRef);
				alert('Post deleted successfully!');
				setPosts(
					posts.filter(post => post.id !== selectedPost.id)
				);
				setSelectedPost(null);
				router.push('/admin');
			} catch (error) {
				console.error('Error deleting post: ', error);
			}
		}
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-4'>
				Delete Post
			</h1>
			<div className='flex gap-4'>
				{posts.map(post => (
					<button
						key={post.id}
						onClick={() => handlePostClick(post)}
						className='text-left border rounded-xl p-2'
					>
						{post.title}
					</button>
				))}
			</div>
			{selectedPost && (
				<div className='mt-4'>
					<h2 className='text-xl font-bold mb-2'>
						Are you sure you want to delete this post?
					</h2>
					<p className='mb-4'>{selectedPost.title}</p>
					<button
						onClick={handleDelete}
						className='bg-red-500 rounded-xl text-white p-2'
					>
						Delete Post
					</button>
				</div>
			)}
		</div>
	);
};

export default DeletePost;
