'use client';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('You must be logged in to add items to the cart.');
      window.location.href = '/login';
      return;
    }

    const item = {
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      quantity: quantity,
      image: product.image,
    };

    addToCart(item);

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col space-y-3 text-base relative">
      {showAlert && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-white font-jost ">
          <Alert>
            <CheckCheck className="h-10 w-5" />
            <AlertTitle>Added to the cart!</AlertTitle>
            <AlertDescription>
              {quantity} piece(s) {product.title}
            </AlertDescription>
          </Alert>
        </div>
      )}
      <div className="flex items-center ">
        <label htmlFor="quantity" className="mr-2 mt-2">
          Quantity:
        </label>
        <div className="flex space-x-2 mt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="w-10 p-1 border rounded bg-red-500 text-white  hover:border-blue-600 hover:bg-red"
          >
            -
          </motion.button>
          <span className="mt-1 text-xl">{quantity}</span>
          <motion.button
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 p-1 border rounded text-black  hover:border-blue-600 hover:bg-transparent"
          >
            +
          </motion.button>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={handleAddToCart}
        className=" p-2 font-jost w-full rounded-2xl border border-slate-600 hover:border-blue-600 hover:bg-transparent hover:text-black"
      >
        Add to cart
      </motion.button>
    </div>
  );
}
