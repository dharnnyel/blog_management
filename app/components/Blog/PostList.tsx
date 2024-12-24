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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			const queryData = await getDocs(
				collection(db, 'posts')
			);
			const postData = queryData.docs.map(doc =>
				doc.data()
			);
			setPosts(postData);
			setLoading(false);
		};

		fetchPosts();
	}, []);
	return (
		<div className='px-8 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
			{loading ? (
				<p>Fetching Posts...</p>
			) : posts.length > 0 ? (
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
