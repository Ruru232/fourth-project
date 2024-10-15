'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Loading from '../products/loading';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  if (!isMounted) {
    return <Loading />;
  }

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedItems = [...prevItems, item];
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      <div>{children}</div>;
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
