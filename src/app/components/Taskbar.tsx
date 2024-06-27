import React, { useEffect, useState } from 'react';
import { Calendar, FullScreen, Home, Left, Media, Video, Note, Pause, Right, Pictures, Task, Timer } from '../../../public/icon/taskbar';
import Slider from './Slider';
import MusicPlayerModal from './MusicPlayerModal';

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

interface TaskbarProps {
  images: ImageProps[];
  video: VideoProps[];
  media: any[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const Taskbar: React.FC<TaskbarProps> = ({ images, video, media, setSelectedItem }) => {
  const [time, setTime] = useState<Date>(new Date());
  const [selectedSlider, setSelectedSlider] = useState<'image' | 'iframe' | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleToggleSlider = (slider: 'image' | 'iframe') => {
    setSelectedSlider(prev => (prev === slider ? null : slider));
  };

  const handleMediaClick = () => {
    setIsMediaModalOpen(true);
  };

  return (
    <>
      {selectedSlider && (
        <Slider
          type={selectedSlider}
          images={images}
          video={video}
          setSelectedItem={setSelectedItem}
        />
      )}
      {isMediaModalOpen && (
        <MusicPlayerModal playlists={media} onClose={() => setIsMediaModalOpen(false)} />
      )}
      <div className="fixed bottom-5 left-5 right-5 bg-[#282624] text-white flex items-center px-10 rounded-full flex justify-items-center item-center">
        <div className="flex items-center mr-auto">
          <span className="mr-5">{formatTime(time)}</span>
        </div>
        <div className="flex mt-2">
          <div className="flex m-2 ml-5 flex-col items-center justify-items-center">
            <Home />
            <span className="mt-1 text-md">Home</span>
          </div>
          <div className="flex m-2 ml-5 flex-col items-center justify-items-center" onClick={() => handleToggleSlider('image')}>
            <Pictures />
            <span className="mt-1 text-md">Picture</span>
          </div>
          <div className="flex m-2 ml-5 flex-col items-center justify-items-center" onClick={() => handleToggleSlider('iframe')}>
            <Video />
            <span className="mt-1 text-md">View</span>
          </div>
          <div className="flex m-2 ml-5 flex-col items-center justify-items-center" onClick={handleMediaClick}>
            <Media />
            <span className="mt-1 text-md">Media</span>
          </div>
          <div className="flex items-center mb-5 pl-5 pr-5 gap-x-7">
            <div className="border-s-2 h-[40px] ml-1 mt-2" />
            <Left />
            <Pause />
            <Right />
            <div className="border-s-2 h-[40px] ml-1 mt-2" />
          </div>
          <div className="flex m-2 ml-5 flex-col items-center justify-items-center">
            <Timer />
            <span className="mt-1 text-md">Timer</span>
          </div>
          <div className="flex m-2 ml-5 flex-col items-center justify-items-center">
            <Task />
            <span className="mt-1 text-md">Task</span>
          </div>
          <div className="flex m-2 ml-5 flex-col items-center justify-items-center">
            <Note />
            <span className="mt-1 text-md">Note</span>
          </div>
          <div className="flex m-2 ml-5 flex-col items-center justify-items-center">
            <Calendar />
            <span className="mt-1 text-md">Calendar</span>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <FullScreen />
        </div>
      </div>
    </>
  );
};

export default Taskbar;
