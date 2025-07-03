import { create } from 'zustand';

interface CategoryState {
  category: string;
  changeCategory: (cat: string) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  category: '',
  changeCategory: (cat) => set({ category: cat }),
}));

export default useCategoryStore;


// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface CategoryState {
//   category: string;
//   changeCategory: (cat: string) => void;
// }

// export const useCategoryStore = create<CategoryState>()(
//   persist(
//     (set) => ({
//       category: '',
//       changeCategory: (cat) => set({ category: cat }),
//     }),
//     {
//       name: 'category-storage', // localStorage key
//     }
//   )
// );

