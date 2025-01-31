import { formatData } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const { _createdAt, views, author: { _id: authorId, name, image: authorImage }, _id, category, image, title, description } = post

    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className='startup-card_date'>
                    {formatData(_createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-primary' />
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>

            {/* Author & Title */}
            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${authorId}`}>
                        <p className='text-16-medium line-clamp-1'>{name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
                    </Link>
                </div>

                {/* Author Profile Image */}
                <Link href={`/user/${authorId}`}>
                    <Image
                        src={authorImage || "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=48&h=48&fit=crop&ixlib=rb-4.0.3"}
                        alt={name || 'User Avatar'}
                        width={48}
                        height={48}
                        className='rounded-full object-cover'
                        priority
                    />
                </Link>
            </div>

            {/* Startup Category & Image */}
            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>{description}</p>
                <Image
                    src={image}
                    alt='Startup Image'
                    width={500} // Set appropriate size
                    height={300}
                    className='startup-card_img object-cover'
                    loading="lazy"
                />
            </Link>

            {/* Category & Details Button */}
            <div className='flex-between gap-3 mt-5'>
                <Link href={`/?query=${description}`}>
                    <p className='text-16-medium'>{category}</p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard
