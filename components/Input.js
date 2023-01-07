import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

function Input() {
  const { data: session } = useSession();

  return (
    <div className='flex border-b pb-4 text-gray-200'>
      {/* left */}
      <div
        className='mx-3 mt-4'
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <img src={session.user.image}
          className='w-10 h-10 rounded-full cursor-pointer'
        />
      </div>

      {/* right */}
      <div className='flex flex-col flex-grow'>

        {/* textbox */}
        <div >
          <textarea
            placeholder="What's happening?"
            className='w-full px-3 py-6 outline-none border-b text-black'
          />
        </div>

        {/* file,emoji,button */}
        <div className='flex items-center  px-2'>

          <div className='flex-grow py-3 flex items-center space-x-3'>

            <input type="file" id='image' hidden />
            <label htmlFor='image'>
              <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            </label>

            <input type="file" id='emoji' hidden />

            <label htmlFor='emoji'>
              <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            </label>

          </div>

          <button className=' bg-blue-300 px-6 py-2 rounded-full text-white font-bold hover:bg-blue-400'>
            Tweet
          </button>
        </div>

      </div>

    </div>
  )
}

export default Input
