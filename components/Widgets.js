import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import News from './News'

function Widgets({ newResults, randomUsers }) {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);

  return (
    <div className='ml-5 mt-2 space-y-5 hidden lg:inline w-[500px]'>
      {/* search bar */}
      <div className='sticky top-2 z-20'>
        <div className='relative flex items-center  '>
          <MagnifyingGlassIcon className='h-5 absolute left-2' />
          <input
            type="text"
            placeholder='Search Twitter'
            className=' outline-none bg-gray-200 rounded-full border border-gray-500 text-gray-700 pl-11
            py-2 focus:border-blue-900 focus:bg-white focus:border-2 w-[90%] xl:w-[75%]'
          />
        </div>
      </div>

      {/* what's happening */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='space-y-3 bg-gray-100 rounded-xl pt-2  text-gray-700 text-center w-[90%] xl:w-[75%]'>
        <h4 className='font-bold text-lg px-4'>
          What&apos;s happening
        </h4>
        {newResults.slice(0, articleNum).map(article => (

          <News
            key={article.title}

            article={article}
          />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className='text-blue-300 pl-4 pb-3 hover:text-blue-400'>
          show more
        </button>
      </motion.div>

      {/* who to follow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='w-[90%] xl:w-[75%] sticky top-16 bg-gray-100 rounded-lg pt-2 text-center'
      >

        <h4 className='font-bold text-lg text-center '>
          Who to follow
        </h4>

        {randomUsers.slice(0, randomUserNum).map((user) => (

          <div
            key={user?.login.uuid}

            className="flex items-center p-2   cursor-pointer hover:bg-gray-200 transition duration-500 ease-out "
          >
            <img
              src={user?.picture.thumbnail}
              alt="randomUser_img"
              className='rounded-full object-contain '
            />

            <div className='w-20 whitespace-nowrap pl-1 flex-grow'>
              <h4 className='truncate font-bold hover:underline cursor-pointer'>{user?.login.username}</h4>
              <h5 className='truncate text-sm text-gray-500'>{user?.name.first + " " + user?.name.last}</h5>
            </div>

            <button className='p-1 py-2 bg-gray-900 text-white rounded-full'>
              Follow
            </button>

          </div>
        ))}
        <button
          onClick={() => setRandomUserNum(randomUserNum + 3)}
          className='text-blue-300 pl-4 py-3 hover:text-blue-400 '
        >
          Show More
        </button>

      </motion.div>

    </div>
  )
}

export default Widgets
