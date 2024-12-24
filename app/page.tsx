import Link from 'next/link';
import { PostList } from './components';

export default function Home() {
	return (
      <div>
      <div className='flex justify-between items-center px-8 py-4'>
        <h1 className='text-3xl font-bold'>Blog Posts</h1>
        <Link href='/auth' className='bg-blue-600 px-5 py-2 rounded-xl'>Admin Login</Link>
        </div>
        <PostList />
      </div>
    );
}
