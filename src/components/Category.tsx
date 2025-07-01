
// import { CategoryType } from "@/types";
import React, { useContext } from "react";

const Category = ({ cat }: any) => {

  return (
    <div
      onClick={() => { }}
      className="text-white bg-amber-400 p-4 rounded-lg shadow-md cursor-pointer"
    >
      {cat?.Title}
    </div>
  )
}

export default Category;