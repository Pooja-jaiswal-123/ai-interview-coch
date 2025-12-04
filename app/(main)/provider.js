import React from 'react'


const DashboardProvider = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#F4F6FA]">
      <div className="p-10">
        {children}
      </div>
    </div>
  )
}

export default DashboardProvider
