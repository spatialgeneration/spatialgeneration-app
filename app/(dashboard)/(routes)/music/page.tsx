"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Music, Send } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const [soundName, setSoundName] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {

      setMusic(undefined);

      const response = await axios.post('/api/music', values);

      console.log(response)

      const music_prediction_url = response.data.urls.get;
      const music_prediction_id = response.data.id;

      // Wait 60 seconds for the model to generate the music

      await new Promise(resolve => setTimeout(resolve, 70000));

      const music_data = await axios.post('/api/music-prediction', {
        music_prediction_id, 
        music_prediction_url
      });

      console.log(music_data.data);

      var generated_music = music_data.data.output;

      setMusic(generated_music);

    } catch (error: any) {

      if (error?.response?.status === 403) {
        proModal.onOpen();

      } else {

        toast.error("Something went wrong.");
      }

    } finally {
      router.refresh();
    }
  }

  return ( 
    <div>
      <br/>
      <br/>
      <Heading
        title="SpaceGen"
        description="Turn your space into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                  <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading} 
                      placeholder="A summer drive down the Pacific Coast highway." 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
              Generate
            </Button>
          </form>
        </Form>
        <p className="text-gray-500 mt-2 text-xs">This will take ~ 1 minute.</p>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
   );
}
 
export default MusicPage;
