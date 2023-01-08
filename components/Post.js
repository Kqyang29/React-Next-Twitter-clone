import { ChartBarIcon, ChatBubbleLeftIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import TimeAgo from 'timeago-react';
import { db } from '../firebase';

import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

function Post({ post, id }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLike, setHasLike] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'twitter_posts', id, 'like'),
      (snapshot) => {
        setLikes(snapshot.docs);
      });


  }, [db]);

  useEffect(() => {
    setHasLike(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLike) {
        await deleteDoc(doc(db, "twitter_posts", id, 'like', session?.user?.uid));
      } else {
        await setDoc(doc(db, "twitter_posts", id, 'like', session?.user?.uid), {
          username: session.user.username,
        });
      }
    }
    else {
      router.push('/login');
    }

  }


  return (
    <div className='flex overscroll-y-scroll border-b border-gray-200'>
      {/* left */}
      <div className='my-4 mx-3'>
        <img src={post.data()?.userImg}
          className='w-10 h-10 rounded-full cursor-pointer'
        />
      </div>

      {/* right */}
      <div className='flex-1 flex flex-col px-3 py-4'>
        {/* post header */}
        <div className='flex items-center'>
          {/* name and username */}
          <div className='flex items-center flex-grow space-x-2'>
            <h2 className='font-bold'>{post?.data()?.name}</h2>
            <span className='text-sm '>
              @{post?.data()?.username} -{" "}
              <TimeAgo
                datetime={post?.data()?.timestamp.toDate()}
              />
            </span>
          </div>

          {/* icon */}
          <EllipsisHorizontalIcon
            className='w-7 h-7 hoverEffect hover:bg-sky-100 hover:text-blue-500 xl:p-0' />

        </div>

        {/* post text */}
        <p className='text-lg my-2'>{post?.data()?.text}</p>


        {/* post img */}
        <div>
          <img
            src={post?.data()?.image}
            alt="post_img"
            className='rounded-lg'
          />
        </div>


        {/* icons */}
        <div className='flex items-center justify-between p-2'>
          <ChatBubbleLeftIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

          <TrashIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

          <div className='flex items-center'>
            {hasLike ? (
              <HeartIconFilled
                onClick={likePost}
                className='w-10 h-10 hoverEffect p-2 text-red-600 hover:bg-red-100' />
            ) : (
              <HeartIcon
                onClick={likePost}
                className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />
            )}

            {likes.length > 0 && (
              <span className={`${hasLike && "text-red-600"} text-sm select-none text-gray-500`}>
                {likes.length}
              </span>
            )}
          </div>

          {/* <HeartIcon
            onClick={likePost}
            className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' /> */}



          <ShareIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

          <ChartBarIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

        </div>


      </div>
    </div>
  )
}

export default Post
