'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Stars = (rating: number) => {
  const totalStars = 5;
  const filledStars = '⭐️'.repeat(rating);
  const blankStars = '☆'.repeat(totalStars - rating);
  return filledStars + blankStars;
};

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: 'Jane Doe',
      rating: 4,
      review:
        "Great product! It was exactly as described and arrived on time. The quality is impressive for the price. I'm using it daily and haven't had any issues so far. Would definitely recommend!",
    },
    {
      id: 2,
      name: 'John Doe',
      rating: 3,
      review:
        "It's okay, but not quite what I expected. The product works, but the build quality feels a bit cheap. It's functional, but I'd probably look for something more durable next time.",
    },
    {
      id: 3,
      name: 'Juan Dela Cruz',
      rating: 5,
      review:
        "Amazing! Exceeded my expectations. I've been using this for a week, and it's been fantastic. Great value for money, and it looks even better in person. Highly recommend to anyone looking for quality.",
    },
    {
      id: 4,
      name: 'Jillian Dela Cruz',
      rating: 2,
      review:
        "Not very happy with this purchase. It didn't work as well as I thought it would, and the instructions were unclear. Customer service was helpful, but I still wouldn't buy it again.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-10 bg-slate-50 px-4 sm:px-6">
      <h2 className="font-jost text-black text-3xl sm:text-4xl font-bold mt-6 sm:mt-10 text-center">
        Customer Testimonials
      </h2>
      <div className="flex justify-center my-8 sm:my-10 w-full ">
        <Swiper
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          className="mySwiper max-w-screen-lg h-full"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="flex justify-center text-wrap ">
                <Card key={review.id} className="w-3/4 h-auto">
                  <CardHeader>
                    <CardTitle>{review.name} </CardTitle>
                    <CardDescription>
                      Rating: {Stars(review.rating)}{' '}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{review.review}</CardContent>
                  <CardFooter>Thank You, {review.name}</CardFooter>
                </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
