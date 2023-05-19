import { getFiltersData } from "@/lib/db-queries";
import AddNote from "../components/AddNote";
export default async function Note() {
  const data = await getFiltersData();
  return (
    <div>
      <AddNote categories={data} />
    </div>
  );
}
