import React from "react";
import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";


const BookCard = ({
    id,
    title,
    genre,
    color,
    cover,
    isloanedBook = true,
}: Book) => {
    return (
        <li className={cn(isloanedBook && 'xs:w-52 w-full flex flex-col items-center')}>
            <Link href={`/book/${id}`}>
                
            </Link>
<BookCover coverColor={color} coverImage={cover} />

            <div className={cn('mt-4', !isloanedBook && 'xs:max-w-240 max-w-28')}>
                <p className="book-title">  
                    {title}
                </p>

                <p className="book-genre">
                    {genre}
                </p>
            </div>

            {isloanedBook && (
                <div className="mt-3 w-full">
                    <div className="book-loaned">
                        <Image src='/icons/calendar.svg' alt='calendar' width={18} height={18} className='object-contain' />

                        <p className="text-light-100">11 days left</p>
                    </div>

                    <button className="book-btn">Download receipt</button>
                </div>
            )}
        </li>
    )
};

export default BookCard;
