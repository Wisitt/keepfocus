import React, { useState } from 'react';

interface MusicPlayerModalProps {
  playlists: any[];
  onClose: () => void;
}

const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({ playlists, onClose }) => {
  const [showModal, setShowModal] = useState(true); // เริ่มต้นเปิด Modal ทันที

  const toggleModal = () => {
    setShowModal(!showModal);
    onClose(); // เรียกใช้ onClose เมื่อปิด Modal
  };

  return (
    <>
          {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-xl">
            <button
              className="absolute top-0 right-0 m-3 text-gray-700 hover:text-gray-600"
              onClick={toggleModal}
            >
              &times;
            </button>
            <div className="flex flex-col space-y-4">
              <h2 className="text-lg font-bold">Spotify Playlists</h2>
              {playlists.map((playlist) => (
                <iframe
                  key={playlist.id}
                  title="Spotify Playlist"
                  src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
                  width="100%"
                  height="380"
                  allowTransparency={true}
                  allow="encrypted-media"
                  className="rounded-lg overflow-hidden shadow-md"
                ></iframe>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayerModal;
