import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getOpenGraphData } from "@/lib/getOpenGraphApiData";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const req = await request.json();
  console.log("Billy will now present to you...", req);
  const { categoryId, content, postUrl, published } = req;

  let postTitle = "";
  let postImageUrl = "";

  if (postUrl !== "") {
    const billy = await getOpenGraphData(postUrl);
    postTitle = billy.hybridGraph.title;
    postImageUrl = billy.hybridGraph.imageSecureUrl;
  }

  const result = await prisma.post.create({
    data: {
      content: content,
      postTitle: postTitle,
      postUrl: postUrl,
      postImageUrl: postImageUrl,
      published: published,
      author: { connect: { email: session?.user?.email } },
      categories: {
        create: [
          {
            category: {
              connect: {
                id: parseInt(categoryId),
              },
            },
          },
        ],
      },
    },
  });

  return NextResponse.json({ result });
}
