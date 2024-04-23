import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';

type AssetsPreviewProps = {
  assetUrls: string[];
};

const Modal: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="overflow-hidden relative border rounded-lg shadow-xl shadow-gray-500/20 flex flex-col items-center">
        <div className="flex gap-2 absolute right-2.5">
          <a href={src} target="_blank" download className="cursor-pointer text-lg">
            <FontAwesomeIcon icon={faDownload} /> {/* Download Icon */}
          </a>
          <div className="self-end cursor-pointer text-2xl" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <img src={src} alt="Modal Asset" className="max-h-[80vh] max-w-[80vw]" />
      </div>
    </div>
  );
};

const AssetsPreview: React.FC<AssetsPreviewProps> = ({ assetUrls }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState('');

  const openModal = (url: string) => {
    setActiveImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 m-4">
      {assetUrls.map((assetUrl, index) => (
        <div key={index} className="relative border-dashed border-2 border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl aspect-w-1 aspect-h-1 w-full h-[260px] sm:w-[30%] max-w-xs overflow-hidden">
          {assetUrl ? (
            <div onClick={() => openModal(assetUrl)}>
              <Image src={assetUrl} alt={`Asset ${index}`} layout="fill" objectFit="cover" style={{ cursor: 'pointer' }} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">
              Your Illustration
            </div>
          )}
        </div>
      ))}
      {modalOpen && <Modal src={activeImageUrl} onClose={closeModal} />}
    </div>
  );
};

export default AssetsPreview;
