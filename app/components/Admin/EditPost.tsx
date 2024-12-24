'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@lib/firebaseConfig';
import {
	collection,
	getDocs,
	doc,
	updateDoc,
} from 'firebase/firestore';

type Post = {
	id: string;
	title: string;
	content: string;
};

const EditPost = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [selectedPost, setSelectedPost] =
		useState<Post | null>(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
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
		setTitle(post.title);
		setContent(post.content);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (selectedPost) {
			try {
				const postRef = doc(db, 'posts', selectedPost.id);
				await updateDoc(postRef, {
					title,
					content,
					updatedAt: new Date(),
				});
				alert('Post updated successfully!');
				router.push('/admin');
			} catch (error) {
				console.error('Error updating post: ', error);
			}
		}
	};

	return (
		<div className='container mx-auto sm:p-4'>
			<h1 className='text-3xl font-bold mb-4'>Edit Post</h1>
			<div className='flex flex-col lg:flex-row gap-10 lg:gap-32'>
				<div className='flex flex-col gap-4 w-full lg:w-1/3'>
					{posts.map(post => (
						<button
							key={post.id}
							onClick={() => handlePostClick(post)}
							className='text-left border rounded-lg p-2'
						>
							{post.title}
						</button>
					))}
				</div>
				{selectedPost && (
					<form
						onSubmit={handleSubmit}
						className='flex flex-col gap-4 w-full lg:w-2/3'
					>
						<input
					type='text'
					placeholder='title'
					value={title}
					onChange={e => setTitle(e.target.value)}
					required
					className='border-2 outline-none bg-transparent border-blue-500 rounded-xl px-3 py-2 placeholder:text-gray-500'
				/>
				<textarea
					placeholder='Blog Content'
					value={content}
					onChange={e => setContent(e.target.value)}
					className='border-2 outline-none bg-transparent border-blue-500 rounded-xl px-3 py-2 placeholder:text-gray-500'
					rows={10}
					cols={30}
					required
				/>
				<button
					type='submit'
					className='w-60 bg-blue-600 py-3 rounded-2xl'
				>
					Update Post
				</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default EditPost;
