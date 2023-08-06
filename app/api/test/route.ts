import { client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

try {
const body = await req.json();
const { prompt } = body;

const app = await client("https://85f00cee8ca5c8de88.gradio.live/");
const result = await app.predict(0, [
    "facebook/musicgen-large",
    "MultiBand_Decoder",
    "The following is a song by The Beatles.",
    "",
    22,
    250,
    0,
    1,
    3,
	]);

return NextResponse.json(result);

} catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};