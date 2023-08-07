import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
  req: Request
) {
  try {
    
    const { userId } = auth();
    const body = await req.json();
    const { music_prediction_id, music_prediction_url  } = body;

    let prediction = await replicate.predictions.get(music_prediction_id);

    return NextResponse.json(prediction.output);
    
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
