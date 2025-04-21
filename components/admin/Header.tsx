import { cn } from '@/lib/utils'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'

const Header = ({ session }: { session: Session }) => {
  return (
    <header className='admin-header'>
      <div >
        <h2 className='text-wxl font-semibold text-dark-400'>
          {session?.user?.name}
        </h2>
        <p className='text-base terxt-slate-500'>
          ADMIN PANEL
        </p>

          <Link href='/' className='text-base cursor-pointer capitalize text-black'>
            Beranda
          </Link>

      </div>

    </header>

  )
}

export default Header