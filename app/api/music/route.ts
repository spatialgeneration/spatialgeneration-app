import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export const runtime = 'edge';

export async function POST(
  req: Request
) {
  try {
    
    const { userId } = auth();
    const body = await req.json();
    const { prompt  } = body;

    const response = await replicate.run(
      "facebookresearch/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
      {
        input: {
          model_version: "large",
          prompt: prompt,
          duration: 8
        }
      }
    );

    return NextResponse.json(response);
    
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
