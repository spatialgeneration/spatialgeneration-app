"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"

import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area"
import { Separator } from "@/registry/new-york/ui/separator"

import { AlbumArtwork } from "@/components/album-artwork"

export interface Album {
  name: string
  artist: string
  cover: string
}

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Music, Send } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const initialSongs = [
  {
    audio_image: '/images/lo.png',
    audio_file_name: 'lofi.wav',
    audio_file: '/audio/lofi.wav',
    audio_tags: ['lofi', 'beats', 'sf'],
  },
  {
    audio_image: '/images/cafemambo.jpg',
    audio_file_name: 'cafemambo.wav',
    audio_file: '/audio/cafemambo.wav',
    audio_tags: ['house', 'tropical', 'ibiza', 'sunset'],
  },
  {
    audio_image: '/images/cafemambo.jpg',
    audio_file_name: 'cafemambo_extended.wav',
    audio_file: '/audio/funky_edm_vibes.wav',
    audio_tags: ['house', 'tropical', 'ibiza', 'sunset'],
  },
  {
    audio_image: '/images/space.jpg',
    audio_file_name: 'house_techno.wav',
    audio_file: '/audio/house_techno.wav',
    audio_tags: ['house', 'techno', 'edm'],
  },
  {
    audio_image: '/images/barca.jpg',
    audio_file_name: 'chill_edm.wav',
    audio_file: '/audio/chill_edm.wav',
    audio_tags: ['house', 'edm', 'chill'],
  },
  {
    audio_image: '/images/autobahn.jpeg',
    audio_file_name: 'autobahn.wav',
    audio_file: '/audio/autobahn.wav',
    audio_tags: ['autobahn', 'speed', 'techno'],
  },
  {
    audio_image: '/images/instru.jpeg',
    audio_file_name: 'instrumental.wav',
    audio_file: '/audio/instrumental.wav',
    audio_tags: ['instrumental', 'rap', 'music'],
  },
  {
    audio_image: '/images/jackson.jpg',
    audio_file_name: 'jackson.wav',
    audio_file: '/audio/jackson.wav',
    audio_tags: ['jackson', 'country', 'music'],
  },
  {
    audio_image: '/images/yacht.png',
    audio_file_name: 'yacht.wav',
    audio_file: '/audio/yacht.wav',
    audio_tags: ['nirvana', 'perfect', 'heaven'],
    description: 'Hans Zimmer, Epic, Boat going out to Sea, Violins, Cello, Sunset, Yacht, Dramatic, Nirvana, ClubMed, Beauty, Open Ocean, Heaven, Perfection'
  },
  {
    audio_image: '/images/shanghai.png',
    audio_file_name: 'shanghai.wav',
    audio_file: '/audio/shanghai.wav',
    audio_tags: ['chillwave', 'indietronica', 'electropop'],
    description: 'house, edm, LED lights, electronic, future bass, EDM trap music, Chillwave, Indietronica, Electropop, Dance/Electronic'
  },
  {
    audio_image: '/images/sawyercamptrail.png',
    audio_file_name: 'sawyercamptrail.wav',
    audio_file: '/audio/sawyercamptrail.wav',
    audio_tags: ['meditation', 'transcendental', 'peaceful'],
    description: 'after morning run meditation sawyer camp trail, meditating sitting on the bench looking out to the pond, peaceful, early am, transcendental'
  },
  {
    audio_image: '/images/platja.png',
    audio_file_name: 'platja.wav',
    audio_file: '/audio/platja.wav',
    audio_tags: ['spanish', 'beach', 'summer'],
    description: 'laying on the beach in barcelona, looking down across the sand at the water and the W hotel in the distance, its summer, beautiful sunny day, people are out, its perfect, guitar, spanish, beach vibes, hot, Mediterranean, iberian, catalunya, tapas, beer, tan, sun, birds flying, blue skies, bliss'
  },
];

const listenNowAlbums: Album[] = [
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
]

const madeForYouAlbums: Album[] = [
  {
    name: "Thinking Components",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
  },
  {
    name: "Functional Fury",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
];

export default function HomePage() {


  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const [soundName, setSoundName] = useState<string>();
  const [songs, setSongs] = useState(initialSongs);

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
  };

  return (
    <div>
      <br />
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the world of generative music
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          SpaceGen is a platform for generating music based on your landscape and environment using AI.
        </p>
      </div>
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
        <div className="mt-8 px-4 md:px-20 lg:px-32 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Listen Now
              </h2>
              <p className="text-sm text-muted-foreground">
                Top picks for you. Updated daily.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {isLoading && (
                <div className="p-20">
                  <Loader />
                </div>
              )}
              {songs.length === 0 && !isLoading && (
                <Empty label="No songs generated." />
              )}
              {songs.map((song) => (
                <Card key={song.audio_file_name} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src={song.audio_image}
                      alt={song.audio_file_name}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold tracking-tight">
                      {song.audio_file_name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap px-4">
                    {song.audio_tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-1 mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <CardFooter className="p-2">
                    <audio controls className="w-full mt-2">
                      <source src={song.audio_file} />
                    </audio>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
    </div >
  );
}
