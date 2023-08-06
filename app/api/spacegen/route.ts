import { client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request

) {
  try {

    const response_0 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
    const exampleAudio = await response_0.blob();
                            
    const app = await client("https://spatialgeneration-musicgen-mbd.hf.space/");
    const result = await app.predict(2, [		
                    "facebook/musicgen-melody", // string  in 'Model' Radio component		
                    "Default", // string  in 'Decoder' Radio component		
                    "Howdy!", // string  in 'Input Text' Textbox component
                    exampleAudio, 	// blob in 'File' Audio component		
                    1, // number (numeric value between 1 and 120) in 'Duration' Slider component		
                    5, // number  in 'Top-k' Number component		
                    5, // number  in 'Top-p' Number component		
                    5, // number  in 'Temperature' Number component		
                    5, // number  in 'Classifier Free Guidance' Number component
        ]);
    
    console.log(result);



  } catch (error) {
    console.log('[MUSIC_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
