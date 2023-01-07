import React from 'react'

function SidebarMenuItem({ Icon, title, active }) {
  return (
    <div className={`hoverEffect flex items-center text-gray-700 space-x-2 text-lg justify-center xl:justify-start`}>
      <Icon className={`h-7`} />
      <h3 className={` ${active && `font-bold`} hidden xl:inline`}>{title}</h3>
    </div>
  )
}

export default SidebarMenuItem
