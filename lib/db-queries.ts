import prisma from "../lib/prisma";

export const getNotesData = async () => {
  try {
    const initialResults = await prisma.post.findMany({
      where: {},
      include: {
        categories: true,
      },
    });
    return initialResults;
  } catch (err) {
    console.log(err);
  }
};

export const getFiltersData = async () => {
  const maggie = await fetch("http://localhost:3000/api/filters");
  const cats = await maggie.json();

  return cats;
};
