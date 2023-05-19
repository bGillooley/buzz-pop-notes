import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import NoteBlock from "@/app/components/note-block";
import { Suspense } from "react";
import Loading from "./loading";

const getfilteredResults = async (id: Number) => {
  try {
    const filteredResults = await prisma.post.findMany({
      where: {
        categories: {
          some: {
            category: {
              id: parseInt(id),
            },
          },
        },
      },
    });
    return filteredResults;
  } catch (err) {
    console.log(err);
  }
};

export default async function FilteredNotes({ params }) {
  const session = await getServerSession(authOptions);
  console.log("MEEEEE", session);
  const id = params.categoryId;

  const notesData = await getfilteredResults(id);
  const notes = notesData;

  if (!session) {
    return (
      <div className="relative mx-auto max-w-2xl">
        <h2>No Shit for you!</h2>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* @ts-expect-error Async Server Component */}
      <NoteBlock notes={notes} />
    </div>
  );
}
