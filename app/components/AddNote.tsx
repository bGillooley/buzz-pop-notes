"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

export default function AddNote({ categories }) {
  const inputEl = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [postUrl, setPostUrl] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const filterCategoryId = categories.currentCats.find(
        (cat) => cat.name === category
      );
      console.log(filterCategoryId);
      const categoryId = filterCategoryId.id;
      const body = { categoryId, content, postUrl };
      await fetch("http://localhost:3000/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl px-4 pt-16 mx-auto">
      <form onSubmit={submitData}>
        <h1 className="text-2xl pb-2">Add new note</h1>
        <textarea
          className="w-full mb-2 rounded-md p-2 border-2 border-stone-400"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Start typing here..."
          rows={6}
          value={content}
          ref={inputEl}
        />
        <input
          onChange={(e) => setPostUrl(e.target.value)}
          type="text"
          placeholder="Add URL here..."
          value={postUrl}
          className="w-full mb-2 rounded-md p-2 border-2 border-stone-400"
        />
        <div className="mb-4">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 rounded-md bg-slate-50 px-1 py-2"
          >
            <option hidden>Place in a category:</option>
            {categories.currentCats.map((cat) => (
              <option key={cat.id} value={`${cat.name}`}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <input
          className="px-4 py-2 rounded-full font-semibold bg-blue-700 text-white"
          type="submit"
          value="Add note"
        />
      </form>
    </div>
  );
}
