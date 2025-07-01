'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = ({ params }: { params: Promise<{ documentId: string }> }) => {
  const { documentId } = React.use(params);

  const fetchBlogs = async (documentId: string) => {
    const response = await fetch(`http://127.0.0.1:1337/api/blogs/${documentId}?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return await response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', documentId],
    queryFn: ({ queryKey }) => fetchBlogs(queryKey[1]),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog</div>;

  const blog = data?.data;
  const description = blog?.Description?.[0]?.children?.[0]?.text || '';
  const imgUrl = blog?.img?.url ? `http://127.0.0.1:1337${blog.img.url}` : '';

  return (
    <div className='w-full mx-auto p-4'>
      <Link href="/">
        <div className='bg-amber-400 text-white px-4 py-2 rounded w-fit'>Back</div>
      </Link>

      <div className='relative w-full h-96 overflow-hidden rounded-lg mt-5'>
        {imgUrl && (
          <Image
            src={imgUrl}
            alt={blog?.img?.name || blog?.Title}
            fill
            className='rounded-t-lg object-cover'
          />
        )}
      </div>

      <div className='mt-4'>
        <h1 className='text-3xl font-semibold'>{blog?.Title}</h1>
        <p className='text-gray-600 mt-2'>{description}</p>
        <div className='text-gray-400 mt-3 flex items-center'>
          <span className='text-sm'>
            Published on {new Date(blog?.publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
