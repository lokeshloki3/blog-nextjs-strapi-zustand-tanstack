import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({ blog }: any) => {
  const description = blog.Description?.[0]?.children?.[0]?.text;
  const TruncateBlogDesc = description.length > 80 ? description.substring(0, 80) + "..." : description;

  const imgUrl = "http://127.0.0.1:1337" + blog.img.url;

  return (
    <div className='rounded-lg shadow-md p-4 mb-4 overflow-hidden border border-b-gray-600'>
      <Link href={`/blog/${blog.documentId}`}>
        <div className='relative w-full h-1' style={{ paddingBottom: "100%" }}>
          <Image
            src={imgUrl}
            alt={blog.img.name || blog.Title}
            fill
            className='rounded-t-lg object-cover'
          />
        </div>
        <div className='p-2'>
          <h2 className='text-xl font-semibold mb-2 overflow-ellipsis'>
            {blog.Title}
          </h2>
        </div>
      </Link>
      <p className='text-gray-600'>{TruncateBlogDesc}</p>

    </div>
  );
};

export default BlogCard;
