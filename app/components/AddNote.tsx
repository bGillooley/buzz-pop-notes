"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Switch } from "@headlessui/react";

export default function AddNote({ categories }) {
  const inputEl = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
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
      const body = { categoryId, content, postUrl, published };
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
        <div className="flex my-4 py-4 align-center">
          <span className="mr-4">Make this public: </span>
          <Switch
            checked={published}
            onChange={setPublished}
            className={`${
              published ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}>
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                published ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <div className="mb-4">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 rounded-md bg-slate-50 px-1 py-2">
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
