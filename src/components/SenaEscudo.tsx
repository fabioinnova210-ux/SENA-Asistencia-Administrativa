import React, { useState } from 'react';

interface SenaEscudoProps {
  className?: string;
  alt?: string;
}

export const SENA_ESCUDO_LOCAL_PATH = '/src/assets/images/escudo_sena.png';
export const SENA_ESCUDO_REMOTE_URL = 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png';

export const SenaEscudo: React.FC<SenaEscudoProps> = ({
  className = 'w-32 h-32 object-contain',
  alt = 'Escudo Oficial del SENA',
}) => {
  const [imgSrc, setImgSrc] = useState(SENA_ESCUDO_LOCAL_PATH);

  const handleError = () => {
    // If local fails, fallback to official SENA remote CDN URL
    if (imgSrc !== SENA_ESCUDO_REMOTE_URL) {
      setImgSrc(SENA_ESCUDO_REMOTE_URL);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
};
