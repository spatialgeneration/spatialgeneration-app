import { client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request

) {
  try {

    const body = await req.json();
    const { prompt } = body;

    const app = await client("https://85f00cee8ca5c8de88.gradio.live/");

    const response = await app.submit(1, [
      "facebook/musicgen-large",
      "MultiBand_Decoder",
      prompt,
      "",
      22,
      250,
      0,
      1,
      3,
    ]).on("data", (data) => {
      console.log('Data:', data);
      // Here you can handle the data returned by the prediction.
      // For instance, you can send it as a response to the client.
    })
      .on("status", (status) => {
        console.log('Status:', status);
        // Here you can handle the status updates of the prediction.
      });

    // Assuming NextResponse is a custom response wrapper, you can simply use Next.js response directly
    return NextResponse.json(response);

  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
