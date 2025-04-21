'use server'

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"


export const createBook = async (params: BookParams) => {
    try {
        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies
        }).returning()

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook[0]))
        }
    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: 'an error occured'
        }
    }
}

export async function getBooks() {
    const rawBooks = await db
      .select()
      .from(books)
      .limit(10);
  
    const result: Book[] = rawBooks.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating,
        totalCopies: book.totalCopies,
        availableCopies: book.availableCopies,
        description: book.description,
        coverColor: book.coverColor,
        coverUrl: book.coverUrl,
        videoUrl: book.videoUrl,
        summary: book.summary,
        createdAt: book.createdAt,
    }));
  
    return result;
}