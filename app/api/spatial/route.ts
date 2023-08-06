import { client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { prompt } = body;

    const app = await client("https://85f00cee8ca5c8de88.gradio.live/%22)");

    const response = await app.predict(2, ["facebook/musicgen-large", "MultiBand_Decoder", prompt, "", 22, 250, 0, 1, 3]);

    return NextResponse.json(response);
    
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};