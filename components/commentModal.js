import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/modalAtom';
import Modal from 'react-modal';
import { FaceSmileIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import TimeAgo from 'timeago-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(() => {

    const unsub = onSnapshot(doc(db, "twitter_posts", postId), (snapshot) => {
      setPosts(snapshot);
    });

    return () => unsub;
  }, [postId, db]);

  const sendComment = async () => {
    await addDoc(collection(db, 'twitter_posts', postId, "comments"), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      userId: session.user.uid
    });

    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  }

  return (
    <div>
      {open && (
        <Modal
          ariaHideApp={false}
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="p-2 max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md z-50 "
        >
          <div>
            {/* header */}
            <div className='border-b '>
              <XMarkIcon
                onClick={() => setOpen(false)}
                className='w-7 h-7 xl:w-12 xl:h-12 hoverEffect ml-5 my-2 xl:ml-2 xl:my-0 font-bold  ' />
            </div>


            {/* boday */}
            <div className='relative p-2 -mt-5 space-y-7 flex flex-col'>

              <span className="w-0.5 h-[120px] z-[-1] absolute left-8 top-11 bg-gray-300" />

              {/* up */}
              <div className='flex items-center space-x-2'>
                <img
                  src={posts?.data()?.userImg}
                  alt="user image"
                  className='w-11 h-11 rounded-full ml-1'
                />

                <h4 className='font-bold'>
                  {posts?.data()?.name}
                </h4>

                <span className='text-sm text-gray-500'>
                  @{posts?.data()?.username} -{" "}
                  <span>
                    <TimeAgo datetime={posts?.data()?.timestamp.toDate()} />
                  </span>
                </span>
              </div>

              {/* post text */}
              <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
                {posts?.data()?.text}
              </p>

              {/* bottm */}
              <div className='flex space-x-3 items-start '>
                <img
                  src={session.user?.image}
                  alt="currentUser_img"
                  className='w-11 h-11 rounded-full cursor-pointer ml-1'
                />

                <div className='flex-grow'>
                  <textarea
                    placeholder='Tweet Your Reply' className='w-full p-2 outline-none border-b'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  <div className='flex items-center  px-2'>

                    <div className='flex-grow py-3 flex items-center space-x-3'>

                      <input
                        type="file"
                        id='image'
                        hidden
                      />
                      <label htmlFor='image'>
                        <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      </label>

                      <input type="file" id='emoji' hidden />

                      <label htmlFor='emoji'>
                        <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      </label>

                    </div>

                    <button
                      onClick={sendComment}
                      className=' bg-blue-300 px-6 py-2 rounded-full text-white font-bold hover:bg-blue-400 disabled:cursor-not-allowed'>
                      Reply
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Modal>
      )
      }
    </div >
  )
}

export default CommentModal
