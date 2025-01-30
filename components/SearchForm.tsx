"use client"
import React from 'react'
import SearchFormRest from './SearchFormRest'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

const SearchForm = ({ query }: { query?: string }) => {



    return (
        <form action="/" className='search-form'>
            <input name="query"
                defaultValue={query}
                className='search-input'
                placeholder='Search Startups' />
            <div className='flex gap-2'>
                {query && <SearchFormRest />}
                <Button type='submit' className='search-btn text-white' >
                    <Search className='size-5' />
                </Button>
            </div>
        </form>
    )
}

export default SearchForm