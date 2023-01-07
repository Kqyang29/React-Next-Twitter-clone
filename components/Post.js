import { ChartBarIcon, ChatBubbleLeftIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

function Post({ post }) {
  return (
    <div className='flex overscroll-y-scroll border-b border-gray-200'>
      {/* left */}
      <div className='my-4 mx-3'>
        <img src={post.userImg}
          className='w-10 h-10 rounded-full cursor-pointer'
        />
      </div>

      {/* right */}
      <div className='flex-1 flex flex-col px-3 py-4'>
        {/* post header */}
        <div className='flex items-center'>
          {/* name and username */}
          <div className='flex items-center flex-grow space-x-2'>
            <h2 className='font-bold'>{post.name}</h2>
            <span className='text-sm '>
              @{post.username} - {post.timestamp}
            </span>
          </div>

          {/* icon */}
          <EllipsisHorizontalIcon
            className='w-7 h-7 hoverEffect hover:bg-sky-100 hover:text-blue-500 xl:p-0' />

        </div>

        {/* post text */}
        <p className='text-lg my-2'>{post.text}</p>


        {/* post img */}
        <div>
          <img
            src={post.img}
            alt="post_img"
            className='rounded-lg'
          />
        </div>


        {/* icons */}
        <div className='flex items-center justify-between p-2'>
          <ChatBubbleLeftIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

          <TrashIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

          <HeartIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

          <ShareIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

          <ChartBarIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

        </div>


      </div>
    </div>
  )
}

export default Post
