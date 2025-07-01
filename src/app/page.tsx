"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const getBlogs = async () => {
    const response = await fetch("http://127.0.0.1:1337/api/categories");
    return await response.json();
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {data.data.map((item: any) => (
            <div key={item.id}>
              <h1>{item.Title}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
