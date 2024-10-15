'use client';
import { useEffect, useState } from 'react';
import { CartItem } from '../components/CartContext';
import { useCart } from '../components/CartContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Loading from '../cart/loading';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [isLoggedIn, router]);

  const updateQuantity = (id: number, amount: number) => {
    const item = cartItems.find((item: { id: number }) => item.id === id);

    if (item) {
      const newQuantity = item.quantity + amount;

      if (newQuantity > 0) {
        addToCart({ ...item, quantity: amount });
      } else if (newQuantity === 0) {
        setOpenDialog(true);
        setItemToRemove(item);
      }
    }
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
      setItemToRemove(null);
      setOpenDialog(false);
    }
  };

  const totalAmount = cartItems.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert(
      `Thank you for your purchase! Your total is $${totalAmount.toFixed(2)}`
    );
    clearCart();
  };

  return (
    <div className="text-black font-jost h-screen max-w-5xl mx-auto mt-40 p-10 bg-white">
      <h2 className="text-2xl md:text-4xl font-bold">Your Cart</h2>
      {loading ? (
        <Loading />
      ) : cartItems.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <>
          <div className="divide-y">
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="py-4 flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={96}
                  height={96}
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex space-x-2 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-10 p-1 border rounded bg-red-500 text-white  hover:border-blue-600 hover:bg-red"
                    >
                      -
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-10 p-1 border rounded text-black  hover:border-blue-600 hover:bg-transparent"
                    >
                      +
                    </motion.button>
                    <AlertDialog>
                      <AlertDialogTrigger className="p-1 border rounded bg-gray-500 text-white font-jost">
                        Remove
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white font-jost">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-black">
                            Remove Item from Cart?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {item.title} from
                            the cart?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="text-black">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeFromCart(item.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
            <p className="mt-8 p-1 text-xl font-bold">
              Total Amount: ${totalAmount.toFixed(2)}
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger className="p-2 font-jost w-full rounded-2xl border border-slate-600 hover:border-blue-600 hover:bg-transparent hover:text-black">
              Checkout
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white font-jost">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black">
                  Thank you for your purchase! Here is your receipt
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {cartItems.length > 0 ? (
                    <div>
                      {cartItems.map((item: CartItem) => (
                        <div key={item.id} className="mb-4">
                          <p>Title: {item.title}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>
                            Item Sub-Total: $
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                    </div>
                  ) : (
                    <p>No items in the cart</p>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleCheckout}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
      {itemToRemove && (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent className="bg-white font-jost">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-black">
                Remove Item from Cart?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove {itemToRemove?.title} from the
                cart?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setOpenDialog(false)}
                className="text-black"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmRemoveItem}>
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
