import Image from 'next/image';
import { siteConfig } from '@/lib/config';

interface LogoProps {
  variant?: 'full' | 'monogram';
  /** Render the black artwork in white, for dark backgrounds */
  inverted?: boolean;
  className?: string;
  preload?: boolean;
  sizes?: string;
}

const logos = {
  full: { src: '/images/brand/saad-amir-logo.png', width: 787, height: 947 },
  monogram: { src: '/images/brand/saad-amir-monogram.png', width: 787, height: 724 },
};

export default function Logo({ variant = 'full', inverted = false, className = '', preload = false, sizes = '200px' }: LogoProps) {
  const logo = logos[variant];

  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={`${siteConfig.name} logo`}
      preload={preload}
      sizes={sizes}
      className={`h-auto ${inverted ? 'invert' : ''} ${className}`}
    />
  );
}
