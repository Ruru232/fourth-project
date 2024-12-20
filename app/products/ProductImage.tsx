'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  product: Product;
  fill?: boolean;
};

export default function ProductImage({ product, fill }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {fill ? (
        <Image
          src={product.image}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          alt={product.title}
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75  ${
            loading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          }`}
          onLoad={() => setLoading(false)}
        />
      ) : (
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={100}
          style={{ width: 'auto', height: 'auto' }}
          priority
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75  ${
            loading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          }`}
          onLoad={() => setLoading(false)}
        />
      )}
    </>
  );
}
