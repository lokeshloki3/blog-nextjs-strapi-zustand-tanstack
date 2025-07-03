'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const createBlog = async ({ title, description, }: { title: string; description: string; }) => {
  const formData = new FormData();
  formData.append('data[Title]', title);
  formData.append(
    'data[Description]',
    JSON.stringify([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: description }],
      },
    ])
  );

  const res = await fetch('http://127.0.0.1:1337/api/blogs', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    body: formData,
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result?.error?.message || 'Failed to create blog');
  }

  return result;
};

const Page = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      setMessage('Blog created successfully!');
      setTitle('');
      setDescription('');
    },
    onError: (error: any) => {
      console.error(error);
      setMessage(error.message || 'Error creating blog');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage('Please fill all fields');
      return;
    }

    setMessage('');
    mutate({ title, description });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Link href="/">
        <div className="bg-amber-800 text-white px-4 py-2 rounded w-fit">
          Back
        </div>
      </Link>
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          rows={4}
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-amber-800 text-white px-4 py-2 rounded cursor-pointer w-fit"
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default Page;
