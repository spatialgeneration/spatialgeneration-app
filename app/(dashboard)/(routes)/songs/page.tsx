"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Music, Send } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";


const SongsPage = () => {

  const proModal = useProModal();
  const router = useRouter();
  
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
      audio_tags: ['chillwave', 'indietronica', 'electropop' ],
      description: 'house, edm, LED lights, electronic, future bass, EDM trap music, Chillwave, Indietronica, Electropop, Dance/Electronic'
    },
    {
      audio_image: '/images/sawyercamptrail.png',
      audio_file_name: 'sawyercamptrail.wav',
      audio_file: '/audio/sawyercamptrail.wav',
      audio_tags: ['meditation', 'transcendental', 'peaceful' ],
      description: 'after morning run meditation sawyer camp trail, meditating sitting on the bench looking out to the pond, peaceful, early am, transcendental'
    },
    {
      audio_image: '/images/platja.png',
      audio_file_name: 'platja.wav',
      audio_file: '/audio/platja.wav',
      audio_tags: ['spanish', 'beach', 'summer' ],
      description: 'laying on the beach in barcelona, looking down across the sand at the water and the W hotel in the distance, its summer, beautiful sunny day, people are out, its perfect, guitar, spanish, beach vibes, hot, Mediterranean, iberian, catalunya, tapas, beer, tan, sun, birds flying, blue skies, bliss'
    },
  ];
  
  const [songs, setSongs] = useState(initialSongs);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <br />
      <br />
      <Heading
        title="My Songs"
        description="Listen to your songs here."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
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
  );
};
 
export default SongsPage;
