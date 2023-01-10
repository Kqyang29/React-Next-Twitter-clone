import { ChartBarIcon, ChatBubbleLeftIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import TimeAgo from 'timeago-react'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/modalAtom';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';


function Comment({ comment, originalPostId, commentId }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLike, setHasLike] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);


  useEffect(() => {
    const likeUnSub = onSnapshot(collection(db, 'twitter_posts', originalPostId, 'comments', commentId, 'like'),
      (snapshot) => {
        setLikes(snapshot.docs);
      });
  }, [db, originalPostId, commentId]);


  useEffect(() => {
    setHasLike(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLike) {
        await deleteDoc(doc(db, 'twitter_posts', originalPostId, 'comments', commentId, 'like', session?.user?.uid));
      }
      else {
        await setDoc(doc(db, 'twitter_posts', originalPostId, 'comments', commentId, 'like', session?.user?.uid), {
          username: session?.user?.username
        });
      }
    }
    else {
      router.push('/login');
    }


  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteDoc(doc(db, 'twitter_posts', originalPostId, 'comments', commentId));
    }

  }
  return (
    <div className='flex space-x-2 border-b'>
      {/* left */}
      <img
        src={comment?.userImg}
        alt="comment_userIMG"
        className='w-11 h-11 object-contain rounded-full cursor-pointer ml-14 mt-3'
      />

      {/* right */}
      <div className='flex-1 flex flex-col px-3 py-4'>
        {/* up */}
        <div className='flex items-center'>

          {/* left */}
          <div className="flex items-center flex-1 space-x-2">
            <h1 className='font-bold '>{comment?.name}</h1>

            <span className='text-sm text-gray-500'>
              @{comment?.username} -{" "}
              <span>
                <TimeAgo datetime={comment?.timestamp?.toDate()} />
              </span>
            </span>
          </div>

          {/* icon */}
          <EllipsisHorizontalIcon
            className='w-7 h-7 hoverEffect hover:bg-sky-100 hover:text-blue-500 xl:p-0' />
        </div>

        {/* bottom */}
        <p
          onClick={() => router.push(`/posts/${id}`)}
          className=' my-2 cursor-pointer'>
          {comment?.comment}
        </p>

        {/* icons */}
        <div className='flex items-center justify-between p-2'>
          <div className='flex items-center'>
            <ChatBubbleLeftIcon
              onClick={() => {
                if (!session) {
                  router.push('/login');
                } else {
                  setPostId(originalPostId);
                  setOpen(!open);
                }
              }}
              className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500'
            />


          </div>

          {session?.user?.uid === comment?.userId && (
            <TrashIcon
              onClick={deletePost}
              className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />


          )}


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

            {/* <HeartIcon
              onClick={likePost}
              className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' /> */}
          </div>

          <ShareIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

          <ChartBarIcon className='w-10 h-10 hoverEffect p-2 hover:bg-sky-100 hover:text-blue-500' />

        </div>


      </div>
    </div>
  )
}

export default Comment
