import React, { useRef } from 'react';
import { Card, CardContent } from "../components/ui/card";
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

interface VideoProps {
  src: string;
  alt?: string;
  type: string;
  videoId?: string;
  thumbnailUrl?: string;
  title?: string;
}

interface ImageProps {
  thumbnailUrl: string;
  type: any;
  src: string;
  alt?: string;
}

interface SliderProps {
  type: 'image' | 'iframe';
  images: ImageProps[];
  video: VideoProps[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const Slider: React.FC<SliderProps> = ({ type, images, video, setSelectedItem }) => {
  const items = type === 'image' ? images : video;

  const handleVideoClick = (src: string) => {
    setSelectedItem(src);
  };

  return (
    <div className="fixed bottom-[8rem] left-0 right-0 flex justify-center w-full ">
      <div className="bg-[#282624] rounded-2xl w-[600px] flex justify-center pt-6 pb-6 relative">
        <div
          className="absolute  rounded-2xl z-1 left-[0px] h-[182.63px] w-[108px] z-10 top-0"
          style={{ background: "linear-gradient(90deg, #282624 0%, rgba(40, 38, 36, 0) 94.62%)" }}
        ></div>
        <div
          className="absolute  rounded-2xl z-1 right-[0px] h-[182.63px] w-[108px] z-10 top-0"
          style={{ background: "linear-gradient(90deg, #282624 0%, rgba(40, 38, 36, 0) 94.62%)", transform: 'matrix(-1, 0, 0, 1, 0, 0)' }}
        ></div>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="">
                  <Card>
                    <CardContent className="flex p-0 ">
                      {item.src.endsWith('.mp4') ? (
                        <video controls>
                          <source src={item.src} type="video/mp4" />
                        </video>
                      ) : item.type = 'iframe' ? (
                        <img
                            src={item.src || item.thumbnailUrl}
                            title={item.alt || ''}
                            width="300"
                            height="200"
                            className="rounded-lg cursor-pointer"
                            onClick={() => handleVideoClick(item.src)} 
                            alt={''}
                        ></img>
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.alt || ''}
                          width={300}
                          height={200}
                          className="rounded-lg cursor-pointer"
                          onClick={() => handleVideoClick(item.src)}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 z-10" />
          <CarouselNext className="absolute right-0 z-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
