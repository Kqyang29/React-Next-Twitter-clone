import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
function Login({ providers }) {
  // console.log(Object.values(providers))
  // console.log(providers)
  return (
    <div className='flex items-center justify-center h-screen space-x-5'>
      <img
        src="https://th.bing.com/th/id/OIP.5FdsR-T3bX06Zo1su51X-gHaIg?pid=ImgDet&rs=1"
        alt="twitter_login_img"
        className='hidden md:inline-flex  md:h-80 object-cover -rotate-6'
      />


      {Object.values(providers).map((provider) => (
        <div
          key={provider.id}
          className="flex flex-col items-center space-y-5 -mt-16"
        >
          <img src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="twitter_logo"
            className='w-36 object-cover'
          />
          <p className='text-sm text-gray-500'>
            This app is creating for learning purpose!
          </p>
          <button
            className='p-4 bg-blue-400 rounded-lg hover:brightness-90'
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login;

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
