import React from 'react'

function News({ article }) {
  return (
    <a rel="noreferrer" href={article?.url} target="_blank">
      <div className="flex items-center justify-between hover:bg-gray-200 mt-2 p-2 transition duration-500 ease-out">
        {/* left */}
        <div className='text-left'>
          <h3 className='font-bold text-lg'>{article?.title}</h3>
          <p className='text-sm text-gray-500'>{article?.source.name}</p>
        </div>


        {/* right */}
        <img
          src={article?.urlToImage}
          alt="news_img"
          className='w-1/3 h-1/3 object-contain rounded-xl '
        />
      </div>
    </a>
  )
}

export default News
