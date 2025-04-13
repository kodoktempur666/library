'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn, DefaultValues, SubmitHandler, FieldValue, FieldValues, Path } from "react-hook-form"
import { z, ZodType } from "zod"
import Link from 'next/link'


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { FIELD_NAMES, FIELD_TYPES } from '@/constant'
import ImageUpload from './ImageUpload'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface Props<T extends FieldValues> {
    schema: ZodType<T>,
    defaultValues: T,
    onSubmit: (data: T) => Promise<{ success: boolean, error?: string }>,
    type: 'SIGN_IN' | 'SIGN_UP'
}



const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {
    const router = useRouter()
    const isSignIn = type === 'SIGN_IN'
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    })

    // 2. Define a submit handler.
    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit(data)

        if (result.success) {
            toast({
                title: 'Success',
                description: isSignIn ? 'You have successfully signed in.' : 'You have successfully signed up.',
                variant: 'default'
            })

            router.push('/')
        } else {
            toast({
                title: `Error ${isSignIn ? 'signing in' : 'signing up'}.`,
                description: result.error ?? 'an error occured',
                variant: 'destructive'
            })
        }

        
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold text-white'>
                {isSignIn ? "Welcome back to BookWise!" : "Create an account"}
            </h1>
            <p className='text-light-100'>
                {isSignIn ? 'Access the vast collection of books.' : 'Please complete all fields and upload a valid university ID.'}
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full">

                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}

                                    </FormLabel>

                                    <FormControl>
                                        {field.name === 'universityCard' ? (
                                            <ImageUpload onFileChange={field.onChange} />
                                        ) : (
                                            <Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className='form-input' />
                                        )}

                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}


                    <Button type="submit" className='form-btn'>{isSignIn ? 'Sign in' : 'Sign up'}</Button>
                </form>
            </Form>

            <p>
                {isSignIn ? "New to BookWise? " : "Already have an account? "}

                <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='font-bold text-primary'>
                    {isSignIn ? "Create an account" : "Sign in"}
                </Link>
            </p>
        </div>

    )
}

export default AuthForm