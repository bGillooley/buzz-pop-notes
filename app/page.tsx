import { Inter } from "next/font/google";

import { getOwnData } from "@/lib/db-queries";

import NoteBlock from "@/app/components/note-block";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { MdOutlineAdd } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);
  const notesData = await getOwnData();

  if (!session) {
    return (
      <div>
        <h2>No shit for you!</h2>
      </div>
    );
  }

  return (
    <>
      <div className="relative mx-auto max-w-2xl">
        {/* @ts-expect-error Async Server Component */}
        <NoteBlock notes={notesData} />
      </div>
      <Link
        className="fixed flex justify-center items-start bottom-4 right-4 p-4 text-4xl bg-blue-700 rounded-full text-white shadow-md"
        href="/create-note">
        <button className="">
          <MdOutlineAdd />
        </button>
      </Link>
    </>
  );
}
