'use client';

import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../lib/firebaseConfig';

type Props = {};

const CreatePost = (props: Props) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		try {
			await addDoc(collection(db, 'posts'), {
				title,
				content,
				createdAt: new Date(),
			});
			setTitle('');
			setContent('');
			alert('Post created successfully');
		} catch (error) {
			console.error('Error creating post: ', error);
			alert('Error creating post');
		}
	};

	return (
		<div>
			<h1 className='text-3xl font-bold p-4'>
				Create New Post
			</h1>
			<form
				className='flex flex-col gap-8'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					placeholder='title'
					value={title}
					onChange={e => setTitle(e.target.value)}
					required
					className='border-2 outline-none bg-transparent border-blue-500 w-full sm:w-3/4 lg:w-1/2 rounded-xl px-3 py-2 placeholder:text-gray-500'
				/>
				<textarea
					placeholder='Blog Content'
					value={content}
					onChange={e => setContent(e.target.value)}
					className='border-2 outline-none bg-transparent border-blue-500 w-full sm:w-3/4 lg:w-1/2 rounded-xl px-3 py-2 placeholder:text-gray-500'
					rows={10}
					cols={30}
					required
				/>
				<button
					type='submit'
					className='w-60 bg-blue-600 py-3 rounded-2xl'
				>
					Create Post
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
