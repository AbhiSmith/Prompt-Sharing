"use client"

import { SessionProvider } from 'next-auth/react'

const Provide = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>    
  )
}

export default Provide