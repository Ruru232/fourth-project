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
import WavyUnderlineLink from './WavyUnderlineLink2';

type Featured = {
  id: number;
  image: string;
  description: string;
  title: string;
};

export default function FeaturedProducts() {
  const [features, setFeatures] = useState<Featured[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const features = await response.json();

      const FeaturedProducts = features.filter((feature: Featured) =>
        [5, 10, 15, 20].includes(feature.id)
      );
      setFeatures(FeaturedProducts);
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-jost text-black text-4xl font-bold mt-10">
        Featured Products
      </h2>
      <div className="flex flex-row mt-10 space-x-10">
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
            className="grid xsm:grid-cols-1 xsm:space-x-0 md:grid-cols-2 md:gap-5 lg:grid-cols-4 space-x-10 mt-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {features.map((feature) => (
              <motion.div whileHover={{ scale: 1.1 }} key={feature.id}>
                <Card className="w-64 font-jost">
                  <CardHeader>
                    <CardTitle>{feature.title.slice(0, 20)}...</CardTitle>
                    <CardDescription>
                      {feature.description.slice(0, 20)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-48 flex justify-center items-center">
                      <Image
                        src={feature.image}
                        alt={`Image for ${feature.title}`}
                        width={100}
                        height={50}
                        style={{ width: 'auto', height: 'auto' }}
                      />
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
                      <WavyUnderlineLink id={feature.id} />
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
