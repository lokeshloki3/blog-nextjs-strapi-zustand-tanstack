import React from 'react';
import BlogCard from './BlogCard';
import { BlogType } from '@/types';
import useCategoryStore from '@/store/useCategoryStore';

const Blogs = ({ blogs }: { blogs: BlogType[] }) => {
  const { category } = useCategoryStore();

  const filteredBlogs = category === 'All'
    ? blogs
    : blogs.filter((blog) =>
      blog.categories?.some((cat) => cat.Title === category)
    );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {filteredBlogs?.map((blog) => (
        <div key={blog.id}>
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};

export default Blogs;


// import React from 'react'
// import BlogCard from './BlogCard'

// const Blogs = ({ data }: any) => {
//   return (

//     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
//       {data.map((blog: any) => (
//         <div key={blog.id}>
//           <BlogCard blog={blog} />
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Blogs