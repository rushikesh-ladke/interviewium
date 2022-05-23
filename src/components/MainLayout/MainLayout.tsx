import Sidebar from 'components/Sidebar'
import React from 'react'

export const MainLayout = ({ children } : any) => {
  return (
    <React.Fragment>
        <Sidebar/>
        {children}
    </React.Fragment>
  )
}
