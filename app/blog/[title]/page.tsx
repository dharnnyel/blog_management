import { db } from '@lib/firebaseConfig';
import {
	collection,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import React from 'react';

type Props = {
	params: Promise<{ title: string }>;
};

const BlogPost = async ({ params }: Props) => {
	const { title } = await params;
	const queryData = query(
		collection(db, 'posts'),
		where('title', '==', title.replaceAll('%20', ' '))
	);
	const querySnapshot = await getDocs(queryData);
	let post = { title: '', content: '' };

	querySnapshot.forEach(doc => {
		post = doc.data() as { title: string; content: string };
	});
	return (
		<div className='px-4 py-2 flex flex-col gap-10 h-screen'>
			<h1 className='text-center text-4xl font-bold'>
				{post.title}
			</h1>
			<p>{post.content}</p>
		</div>
	);
};

export default BlogPost;
