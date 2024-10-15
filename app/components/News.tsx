'use client';
import { motion } from 'framer-motion';

export default function News() {
  return (
    <div className="flex flex-col justify-center items-center mt-10 font-jost text-black">
      <h2 className="font-bold xsm:text-3xl lg:text-4xl ">
        Subscribe Newsletter
      </h2>
      <p className="xsm:text-sm lg:text-lg">
        Sign up to our Newsletter and get the discount code and free shipping
        voucher.
      </p>
      <form className="mt-2 border ">
        <input
          type="email"
          className="border border-black text-2xl p-2 lg:w-96 xsm:w-40 sm:w-72"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          type="submit"
          className="bg-black text-white rounded-2xl ml-2 text-2xl p-2"
        >
          Subscribe
        </motion.button>
      </form>
    </div>
  );
}
