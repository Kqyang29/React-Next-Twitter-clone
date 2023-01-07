import { FaceSmileIcon, PhotoIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react';
import React, { useRef, useState } from 'react'
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';

function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(session)
  // console.log(postImg)



  const setPostImage = (e) => {


    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

    }

    reader.onload = (readerEvent) => {
      setPostImg(readerEvent.target.result);
    };
  }

  const sendPost = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "twitter_posts"), {
      id: session.user.uid,
      text: input,
      username: session.user.username,
      name: session.user.name,
      timestamp: serverTimestamp(),
      userImg: session.user.image,
    });

    const imageRef = ref(storage, `twitter_posts/${docRef.id}/image`);

    if (postImg) {
      const uploadTask
        = uploadString(imageRef, postImg, 'data_url')
          .then(async () => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, 'twitter_posts', docRef.id), {
              image: downloadURL,
            });
          });

    }

    setInput("");
    setPostImg(null);
    setLoading(false);
  }

  return (
    <div className='flex border-b pb-4 text-gray-200'>
      {/* left */}
      <div
        className='mx-4 mt-4'

      >
        <img
          onClick={() => signOut({ callbackUrl: "/login" })}
          src={session.user.image}
          className='w-12 h-12 rounded-full cursor-pointer bg-red-100'
        />
      </div>

      {/* right */}
      <div className='flex flex-col flex-1 '>

        {/* textbox */}
        <div >
          <textarea
            placeholder="What's happening?"
            className='w-full px-3 py-6 outline-none border-b text-black'
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          {postImg && (
            <div className='relative'>
              <XCircleIcon
                onClick={() => setPostImg(null)}
                className='h-7 text-gray-500 absolute top-3 left-3 cursor-pointer bg-gray-200  hover:text-black rounded-full z-50' />
              <img
                src={postImg}
                alt="posy_img"
                className={`p-2 ${loading && "animate-pulse"}`}
              />
            </div>
          )}
        </div>

        {/* file,emoji,button */}
        {!loading && (
          <div className='flex items-center  px-2'>

            <div className='flex-grow py-3 flex items-center space-x-3'>

              <input
                onChange={setPostImage}
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
              disabled={!input.trim()}
              onClick={sendPost}
              className=' bg-blue-300 px-6 py-2 rounded-full text-white font-bold hover:bg-blue-400 disabled:cursor-not-allowed'>
              Tweet
            </button>
          </div>
        )}

      </div>

    </div>
  )
}

export default Input
