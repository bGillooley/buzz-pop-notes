import { getNotesData } from "@/lib/db-queries";

export default async function Page() {
  const notesData = await getNotesData();
  return (
    <div className="relative mx-auto max-w-md">
      {notesData.map((note: Note) => (
        <div
          key={note.id}
          className={
            "bg-white text-sm text-black break-inside-avoid-column whitespace-nowrap rounded-lg shadow-3xl shadow-stone-900 p-2 mb-4"
          }
        >
          <div className="whitespace-pre-line">{note.content}</div>
        </div>
      ))}
    </div>
  );
}
