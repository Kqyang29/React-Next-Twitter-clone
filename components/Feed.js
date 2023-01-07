import { SparklesIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import React from 'react'
import Input from './Input'
import Post from './Post';

function Feed() {
  const { data: session } = useSession();

  const posts = [
    {
      id: 1,
      name: 'Kangqiang Yang',
      username: 'yang8243',
      userImg: 'https://th.bing.com/th/id/OIP.75QlW0c2G5fEK9flVvYknAHaLH?pid=ImgDet&rs=1',
      img: 'https://th.bing.com/th/id/OIP.nI0YocbKuw2038jFv_VDfQHaD4?pid=ImgDet&rs=1',
      text: 'nice view!',
      timestamp: '2 hours ago',

    },
    {
      id: 2,
      name: 'Kangqiang Yang',
      username: 'yang8243',
      userImg: 'https://th.bing.com/th/id/OIP.75QlW0c2G5fEK9flVvYknAHaLH?pid=ImgDet&rs=1',
      img: 'https://th.bing.com/th/id/OIP.nI0YocbKuw2038jFv_VDfQHaD4?pid=ImgDet&rs=1',
      text: 'nice view!',
      timestamp: '2 hours ago',

    },
    {
      id: 3,
      name: 'Kangqiang Yang',
      username: 'yang8243',
      userImg: 'https://th.bing.com/th/id/OIP.75QlW0c2G5fEK9flVvYknAHaLH?pid=ImgDet&rs=1',
      img: 'https://th.bing.com/th/id/OIP.nI0YocbKuw2038jFv_VDfQHaD4?pid=ImgDet&rs=1',
      text: 'nice view!',
      timestamp: '2 hours ago',

    },
  ];


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
        />
      ))}


    </div>
  )
}

export default Feed
