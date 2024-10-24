import Link from 'next/link';
import ProductImage from '../products/ProductImage';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

type props = {
  product: Product;
};

export default function Products({ product }: props) {
  return (
    <Link
      prefetch={false}
      href={`/products/${product.id}`}
      className="h-96 flex flex-col p-5 rounded border group hover:scale-105 transition-transform ease-out duration-200 bg-white"
    >
      <div className="relative max-h-72 flex-1">
        <ProductImage product={product} fill />
      </div>
      <div className="font-semibold flex items-center justify-between mt-4 mb-1">
        <h2 className="w-44 text-lg truncate">{product.title}</h2>
        <p className="text-gray-500 font-bold">${product.price}</p>
      </div>
      <p className="italic text-sm w-64 line-clamp-2 text-gray-600">
        {product.description}
      </p>
      <div className="flex items-center text-sm my-4">
        {product?.rating.rate}
        {product?.rating.rate && (
          <div className="flex items-center ml-2 mr-6">
            {Array.from({ length: Math.floor(product.rating.rate) }, (_, i) => (
              <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
            ))}
            {Array.from(
              { length: 5 - Math.floor(product.rating.rate) },
              (_, i) => (
                <StarIconOutline key={i} className="h-4 w-4 text-yellow-500" />
              )
            )}
          </div>
        )}
        <p className="text-blue-600 hover:underline cursor-pointer text-xs">
          See all {product?.rating.count} reviews
        </p>
      </div>
    </Link>
  );
}
