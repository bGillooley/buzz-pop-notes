"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

type Category = {
  id: number | string;
  name: string;
};

function CategoryFilter({ categories }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  function activateFilterSelected(id) {
    setActiveFilter(id);
    console.log("HELP");
  }
  return (
    <>
      <div className="max-w-2xl mx-auto overflow-auto mb-4 whitespace-nowrap pt-24">
        <button
          id="all"
          className={`mr-2 p-2 border-2 border-blue-700 text-xs font-semibold  rounded-md ${
            activeFilter === "all" && "bg-blue-700 text-white"
          }`}
          onClick={() => {
            router.push("/");
            setActiveFilter("all");
          }}
        >
          ALL
        </button>
        {categories.currentCats.map((category: Category) => (
          <button
            className={`mr-2 p-2 border-2 border-blue-700 text-xs font-semibold rounded-md ${
              activeFilter === category.name && "bg-blue-700 text-white"
            }`}
            key={category.id}
            id={category.name}
            onClick={() => {
              router.push(`/note/${encodeURIComponent(category.id)}`);
              setActiveFilter(category.name);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default CategoryFilter;
