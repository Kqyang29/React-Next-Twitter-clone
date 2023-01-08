import { SparklesIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Input from './Input'
import Post from './Post';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../firebase';

function Feed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = () => {
      const q = query(collection(db, "twitter_posts"), orderBy("timestamp", "desc"));

      const unsub = onSnapshot(q, (doc) => {
        setPosts(doc.docs);
      });

      return () => unsub();

    }

    getData();
  }, []);



  return (
    <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>

      {/* Feed header */}
      <div className="flex items-center py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className='flex-grow text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className="hoverEffect flex items-center justify-center w-9 h-9 px-0">
          <SparklesIcon className='h-5' />
        </div>
      </div>

      {/* Feed inputbox */}
      {session && <Input />}

      {/* Feed Posts */}
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          id={post.id}
        />
      ))}


    </div>
  )
}

export default Feed
