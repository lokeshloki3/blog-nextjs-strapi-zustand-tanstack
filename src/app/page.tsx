"use client";

import Blogs from "@/components/Blogs";
import Categories from "@/components/Categories";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const getCategories = async () => {
    const response = await fetch("http://127.0.0.1:1337/api/categories", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return await response.json();
  };

  const getBlogs = async () => {
    const response = await fetch("http://127.0.0.1:1337/api/blogs?populate=*", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const json = await response.json();
    return json.data;
  };

  const { data: categoriesData, isLoading: isCategoriesLoading, error: categoriesError, } =
    useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    });

  const { data: blogsData, isLoading: isBlogsLoading, error: blogsError, } =
    useQuery({
      queryKey: ["blogs"],
      queryFn: getBlogs,
    });

  if (isCategoriesLoading || isBlogsLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || blogsError) {
    return (
      <div>
        {categoriesError && <div>Error loading categories: {categoriesError.message}</div>}
        {blogsError && <div>Error loading blogs: {blogsError.message}</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-10 gap-10">
      <Categories categories={categoriesData?.data || []} />
      <Blogs blogs={blogsData} />
    </div>
  );
}
