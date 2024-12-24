import { DocumentData } from 'firebase/firestore/lite';
import React from 'react';

type PostProps = {
	post: DocumentData;
};

const Post = ({ post }: PostProps) => {
	// const { title, content, createdAt } = post;
	return (
		<div className='bg-gray-800 p-4 rounded-2xl space-y-3'>
      <h1 className='text-xl'>{post.title}</h1>
      <p className='text-sm text-gray-500 truncate'>{post.content}</p>
		</div>
	);
};

export default Post;
