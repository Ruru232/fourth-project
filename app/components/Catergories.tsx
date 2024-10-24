'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import WavyUnderlineLink from './WavyUnderlineLink1';

type Product = {
  category: string;
  image: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      const categoryResponse = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      const fetchedCategories = await categoryResponse.json();
      setCategories(fetchedCategories);

      const productResponse = await fetch('https://fakestoreapi.com/products');
      const fetchedProducts = await productResponse.json();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchCategoriesAndProducts();
  }, []);

  const getImageForCategory = (category: string) => {
    const product = products.find((product) => product.category === category);
    return product ? product.image : null;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-jost text-black text-4xl font-bold mt-10">
        Categories
      </h2>
      {loading ? (
        <div className="grid xsm:grid-cols-1 xsm:space-x-0 md:grid-cols-2 md:gap-5 lg:grid-cols-4 space-x-10 mt-10">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="w-64 font-jost">
              <Skeleton className="w-52 h-10 ml-5 mt-5 bg-slate-300 rounded-xl" />
              <Skeleton className="w-52 h-10 ml-5 mt-5 bg-slate-300 rounded-xl" />
              <Skeleton className="w-52 h-36 ml-5 mt-5 bg-slate-300 rounded-xl" />
              <Skeleton className="w-52 h-10 ml-5 mt-5 mb-5 bg-slate-300 rounded-xl" />
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid xsm:grid-cols-1 xsm:space-x-0 md:grid-cols-2 md:gap-5 lg:grid-cols-4 space-x-10 mt-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {categories.map((category, index) => (
            <motion.div whileHover={{ scale: 1.1 }} key={index}>
              <Card className="w-64 font-jost">
                <CardHeader>
                  <CardTitle>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </CardTitle>
                  <CardDescription>{`Explore ${category} products`}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 flex justify-center items-center">
                    {getImageForCategory(category) && (
                      <Image
                        src={getImageForCategory(category) as string}
                        alt={`Image for ${category}`}
                        width={100}
                        height={50}
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div
                    whileHover={{
                      borderBottomColor: '#000',
                      borderBottomWidth: '2px',
                    }}
                    transition={{ duration: 0.2 }}
                    className="border-b-2 border-transparent"
                  >
                    <WavyUnderlineLink category={category} />
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
