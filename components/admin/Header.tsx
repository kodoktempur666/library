import { Session } from 'next-auth'
import React from 'react'

const Header = ({session}: {session: Session}) => {
  return (
    <header className='admin-header'>
        <div >
            <h2 className='text-wxl font-semibold text-dark-400'>
                {session?.user?.name}
            </h2>
            <p className='text-base terxt-slate-500'>
                ADMIN PANEL
            </p>
        </div>
        
    </header>

  )
}

export default Header