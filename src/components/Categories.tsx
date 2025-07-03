'use client';

import React, { useEffect } from 'react';
import Category from './Category';
import { CategoryType } from '@/types';
import useCategoryStore from '@/store/useCategoryStore';
// import { useCategoryStore } from '@/store';

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  const { changeCategory } = useCategoryStore();

  useEffect(() => {
    if (categories.length > 0) {
      changeCategory('All');
    }
  }, [categories, changeCategory]);

  return (
    <div className="flex justify-center items-center gap-6 mb-8 flex-col md:flex-row">
      <div className='w-full md:w-fit bg-amber-800 p-4 md:mb-6 mt-6 rounded-lg text-center cursor-pointer'>
        <button onClick={() => changeCategory('All')} className="cursor-pointer">
          All
        </button>
      </div>
      {categories.map((category) => (
        <div key={category.id} className='w-full md:w-fit'>
          <Category cat={category} />
        </div>
      ))}
    </div>
  );
};

export default Categories;
