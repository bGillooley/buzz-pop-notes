import prisma from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getNotesData = async () => {
  const session = await getServerSession(authOptions);
  try {
    const initialResults = await prisma.post.findMany({
      where: { published: true },
      include: {
        categories: true,
      },
    });
    return initialResults;
  } catch (err) {
    console.log(err);
  }
};

export const getOwnData = async () => {
  const session = await getServerSession(authOptions);
  try {
    const initialResults = await prisma.post.findMany({
      where: {
        OR: [
          {
            author: { email: session.user.email },
          },
          {
            published: true,
          },
        ],
      },
      include: {
        categories: true,
      },
    });
    return initialResults;
  } catch (err) {
    console.log(err);
  }
};

export const getOwnDataOther = async () => {
  const session = await getServerSession(authOptions);
  try {
    const initialResults = await prisma.post.findMany({
      where: {
        author: { email: session.user.email },
        published: false,
      },
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
