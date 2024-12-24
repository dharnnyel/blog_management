'use client';
import { db } from '@lib/firebaseConfig';
import {
	collection,
	getDocs,
	DocumentData,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Post from './Post';

type Props = {};

const PostList = (props: Props) => {
	const [posts, setPosts] = useState<DocumentData[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const queryData = await getDocs(
				collection(db, 'posts')
			);
			const postData = queryData.docs.map(doc =>
				doc.data()
			);
			setPosts(postData);
		};

		fetchPosts();
	}, []);
	return (
		<div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
			{posts.length > 0 ? (
				posts.map((post, index) => (
					<Post
						key={index}
						post={post}
					/>
				))
			) : (
				<p>No posts available</p>
			)}
		</div>
	);
};

export default PostList;
