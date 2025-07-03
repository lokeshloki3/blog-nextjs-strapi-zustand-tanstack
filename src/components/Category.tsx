'use client';

import useCategoryStore from '@/store/useCategoryStore';
import { CategoryType } from '@/types';
import React from 'react';

const Category = ({ cat }: { cat: CategoryType }) => {
  const { category, changeCategory } = useCategoryStore();

  return (
    <div
      onClick={() => changeCategory(cat.Title)}
      className={`${cat.Title === category ? 'bg-white text-black' : 'bg-amber-800'
        } p-4 rounded-lg shadow-md cursor-pointer flex justify-center items-center`}
    >
      {cat?.Title}
    </div>
  );
};

export default Category;
