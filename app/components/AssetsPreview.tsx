import React from 'react';
import Image from 'next/image';

type AssetsPreviewProps = {
  assetUrls: string[];
};

const AssetsPreview: React.FC<AssetsPreviewProps> = ({ assetUrls }) => {
  return (
    <div className="asset">
      {assetUrls.map((assetUrl: string) => (
        <Image src={assetUrl} alt="asset" width={400} height={400} />
      ))}
    </div>
  );
};

export default AssetsPreview;