"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const getBlogs = async () => {
    const response = await fetch("http://127.0.0.1:1337/api/categories");
    return await response.json();
  }

  const query = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })

  return (
    <div>
      {query.isLoading && <p>Loading...</p>}
      {query.error && <p>Error: {query.error.message}</p>}
      {query.data && (
        <div>
          {query.data.data.map((item: any) => (
            <div key={item.id}>
              <h1>{item.Title}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
