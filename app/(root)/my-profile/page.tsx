
import { signOut } from '@/auth'
import React from 'react'
import { Button } from '@/components/ui/button'
import BookList from '@/components/BookList'
import { sampleBooks } from '@/constant'

const page = () => {
  return (
    <>
        <form action={async () => {
        "use server";

            await signOut()
        }} className='mb-10'>
            <Button>Logout</Button>
        </form>

        <BookList title='My books' books={sampleBooks} />
    </>
  )
}

export default page