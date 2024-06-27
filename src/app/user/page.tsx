'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Dropdown from '../components/Dropdown';
import Taskbar from '../components/Taskbar';
import SignInComponent from '../signin/page';
import { fetchSpotifyPlaylists } from '@/lib/utils';
import MusicPlayerModal from '../components/MusicPlayerModal';

function User() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<{ name: string; uri: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'unauthenticated') {
        router.push('/');
      } else if (status === 'authenticated') {
        const accessToken = (session as any)?.accessToken;
        if (accessToken) {
          try {
            const fetchedPlaylists = await fetchSpotifyPlaylists(accessToken);
            setPlaylists(fetchedPlaylists);
          } catch (error) {
            console.error('Error fetching Spotify playlists:', error);
          }
        }
      }
    };

    fetchData();
  }, [router, status, session]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <SignInComponent />;
  }

  const user = session.user;

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-screen">
        {selectedItem ? (
          selectedItem.startsWith('https://www.youtube.com/') ? (
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <iframe
                src={selectedItem}
                className="w-full h-full"
                style={{ border: 'none' }}
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          ) : (
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
              style={{
                backgroundImage: `url('${selectedItem}')`,
              }}
            ></div>
          )
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
            style={{
              backgroundImage: "url('/Rectangle3.svg')",
            }}
          ></div>
        )}
        <div className="relative p-5 z-10">
          <div className="w-[300px]">
            <Dropdown />
          </div>
          <button onClick={handleLogout}>Sign Out</button>
          <h1>Welcome, {user.email}!</h1>
          <div className="w-full">
            <Taskbar
              images={[
                { src: '/Rectangle.svg', alt: 'Image 1', thumbnailUrl: '', type: undefined },
                { src: '/Rectangle1.svg', alt: 'Image 2', thumbnailUrl: '', type: undefined },
                { src: '/Rectangle2.svg', alt: 'Image 3', thumbnailUrl: '', type: undefined },
                { src: '/Rectangle3.svg', alt: 'Image 4', thumbnailUrl: '', type: undefined },
              ]}
              video={[
                { src: 'https://www.youtube.com/embed/6fchNJT_J1Y', alt: 'iframe 1', type: 'iframe', thumbnailUrl: 'https://img.youtube.com/vi/6fchNJT_J1Y/maxresdefault.jpg' },
                { src: 'https://www.youtube.com/embed/6fchNJT_J1Y', alt: 'iframe 2', type: 'iframe', thumbnailUrl: 'https://img.youtube.com/vi/6fchNJT_J1Y/maxresdefault.jpg' },
                { src: '/Rectangle2.svg', alt: 'media 3', type: 'image' },
              ]}
              setSelectedItem={setSelectedItem}
              media={playlists}
            />
            <MusicPlayerModal  onClose={() => setSelectedItem(null)} playlists={playlists} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
