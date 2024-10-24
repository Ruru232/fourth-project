'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Product = {
  id: number;
  image: string;
};

export default function Header() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      setProducts(products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative flex flex-row sm:flex-col items-center justify-center sm:h-[500px] h-[400px] bg-slate-50 p-4 mt-32">
      <div className="absolute font-jost text-black text-center z-10 bg-white bg-opacity-70 p-4 rounded-lg bottom-0">
        <h1 className="mb-3 text-3xl sm:text-5xl font-bold">
          Your One-Stop Shop for All Things Amazing!
        </h1>
        <p className="text-lg sm:text-xl mb-2">
          Men & Women Clothes, Accessories, Electronics, Gadgets and more
        </p>
        <motion.button
          className="w-32 sm:w-24 bg-black font-jost text-white p-2 rounded-2xl"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Link href="/products/">Shop now</Link>
        </motion.button>
      </div>
      <div className="absolute w-full sm:w-[720px] h-full">
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            <Skeleton className="w-full h-[400px] sm:h-[500px] bg-slate-100 rounded-xl" />
          </div>
        ) : (
          <Swiper
            centeredSlides={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
            className="mySwiper w-full h-full"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="w-full h-[500px] flex justify-center bg-white">
                  <Image
                    src={product.image}
                    alt={`Product Logo ${product.id}`}
                    width={200}
                    height={200}
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                    className="opacity-80"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
