import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchSpotifyPlaylists(accessToken: string) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching Spotify playlists:', error);
    throw error;
  }
}