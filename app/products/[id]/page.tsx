import { notFound } from 'next/navigation';
import ProductImage from '../ProductImage';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import AddToCartButton from '@/app/components/AddToCartButton';

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params: { id } }: Props) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: Product = await response.json();

    return (
      <div className="text-black font-jost max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10 bg-white">
        <ProductImage product={product} />
        <div className="divide-y">
          <div className="space-y-2 pb-8">
            <h2 className="lg:text-4xl md:text-2xl xsm:text-lg mt-10 font-bold">
              {product.title}
            </h2>
            <p className="text-gray-500 font-bold text-xl md:text-3xl">
              ${product.price}
            </p>
          </div>
          <div className="pt-8">
            <p className="lg:text-lg md:text-base xsm:text-sm ">
              {product.description}
            </p>
          </div>
          <div className="flex items-center text-sm my-4 pt-5 ">
            <p>{product?.rating.rate}</p>
            {product?.rating.rate && (
              <div className="flex items-center ml-2 mr-6">
                {Array.from(
                  { length: Math.floor(product.rating.rate) },
                  (_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                  )
                )}
                {Array.from(
                  { length: 5 - Math.floor(product.rating.rate) },
                  (_, i) => (
                    <StarIconOutline
                      key={i}
                      className="h-4 w-4 text-yellow-500"
                    />
                  )
                )}
              </div>
            )}
            <p className="text-blue-600 hover:underline cursor-pointer text-xs">
              See all {product?.rating.count} reviews
            </p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
