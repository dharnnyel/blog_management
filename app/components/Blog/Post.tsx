import { DocumentData } from 'firebase/firestore/lite';
import Link from 'next/link';
import React from 'react';

type PostProps = {
	post: DocumentData;
};

const Post = ({ post }: PostProps) => {
	const { title, content, createdAt } = post;
	return (
		<Link href={`/blog/${title}`} className='bg-gray-800 p-4 rounded-2xl space-y-3'>
      <h1 className='text-xl'>{title}</h1>
      <p className='text-sm text-gray-500 truncate'>{content}</p>
		</Link>
	);
};

export default Post;
