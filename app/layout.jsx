import '@styles/globals.css'

import Nav from '@components/Nav'
import Provide from '@components/Provide'


export const metadata = {
    tittle: "Promptopia",
    description: "Promptopia is a website that allows you to create and share prompts.",
}


const RootLayout  = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provide>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provide>
      </body>
    </html>
  )
}

export default RootLayout 