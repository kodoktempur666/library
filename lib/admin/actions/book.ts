'use server'

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { eq } from "drizzle-orm"


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

export const deleteBook = async (id: string) => {
    try {
        const deleteBook = await db.delete(books).where(eq(books.id, id))

        if(deleteBook?.error) {
            return { success: false, error: deleteBook.error };
        }
        return { success: true };
    } catch (error) {
        console.log(error, "Delete book error")
        return { success: false, error: "Delete book error" };
    }
}

export const updateBook = async (params: BookParams) => {
    try {
        const { id, ...rest } = params;
        const updatedBook = await db.update(books).set({ ...rest }).where(eq(books.id, id)).returning()

        if(updatedBook?.error) {
            return { success: false, error: updatedBook.error };
        }
        return { success: true, data: JSON.parse(JSON.stringify(updatedBook[0])) };
    } catch (error) {
        console.log(error, "Update book error")
        return { success: false, error: "Update book error" };
        
    }
}