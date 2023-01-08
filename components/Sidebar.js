import Image from 'next/image'
import React from 'react'
import SidebarMenuItem from './SidebarMenuItem'
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  EllipsisHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react"


function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className='hidden sm:flex flex-col fixed xl:items-start h-full xl:ml-20'>
      {/* Logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-2 mt-2">
        <Image
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt='logo'
          width={50}
          height={50}

        />
      </div >

      {/* Menu */}
      <div className='xl:items-start mb-1' >
        <SidebarMenuItem Icon={HomeIcon} title="Home" active />
        <SidebarMenuItem title="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItem title="Notifications" Icon={BellIcon} />
            <SidebarMenuItem title="Messages" Icon={InboxIcon} />
            <SidebarMenuItem title="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItem title="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem title="Profile" Icon={UserIcon} />
            <SidebarMenuItem title="More" Icon={EllipsisHorizontalIcon} />

            {/* Button */}
            <button
              className='bg-blue-400 text-white rounded-full w-56 h-10  font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'
            >
              Tweet
            </button >

          </>
        )}
      </div >

      {/* mini-profile */}
      {session ? (
        <div
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center space-x-2 hoverEffect text-gray-700 justify-center xl:justify-start" >
          <img
            src={session.user.image}
            alt="mini-profile"
            className="h-10 w-10 rounded-full xl:mr-2"
          />
          <div className='hidden xl:inline leading-5 pr-3'>
            <h4 className='font-bold'>{session.user?.name}</h4>
            <p className='text-gray-500 text-sm'>
              @{session.user.username}
            </p>
          </div>
          <EllipsisHorizontalIcon className='h-5 hidden xl:inline xl:ml-8' />
        </div >
      ) : (
        <button
          className='bg-blue-400 text-white rounded-full w-56 h-12  font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'
          onClick={() => signIn({ callbackUrl: "/login" })}
        >
          Sign In
        </button>
      )}


    </div >
  )
}

export default Sidebar
