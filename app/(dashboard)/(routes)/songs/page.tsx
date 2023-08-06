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
  const [music, setMusic] = useState<string>();
  const [soundName, setSoundName] = useState<string>();
  const [songs, setSongs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  songs.push("https://www.youtube.com/watch?v=jfKfPfyJRdk");

  return ( 
    <div>
      <br/>
      <br/>
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
          {songs.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={src}
                  title={src}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture allowfullscreen" 
                />
              </div>
              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  Play
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
   );
}
 
export default SongsPage;
