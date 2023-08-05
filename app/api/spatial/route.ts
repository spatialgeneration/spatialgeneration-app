import { client } from "@gradio/client";

import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { data } from "autoprefixer";

export async function POST(
  req: Request
) {
  try {
    
    const { userId } = auth();
    const body = await req.json();
    const { prompt  } = body;

    const app = await client("https://ecf64063acb00cdce5.gradio.live/");
    const response = await app.predict(1, [	
                    "facebook/musicgen-large",	
                    "MultiBand_Decoder",
                    "Driving at night in Shaghai along the bund river in Lambo, clear sky, peaceful, electo, cyber punk, on road, LEDs, light, futuristic, edm",
                    22,
                    250,
                    0,
                    1,
                    3,
        ]);

    return NextResponse.json(response);
    
  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
