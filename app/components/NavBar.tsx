'use client';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const scrollToFooter = () => {
    const footer = document.getElementById('contact-us');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray88 shadow-md">
      <div className="flex flex-row justify-center items-center m-10 text-black">
        <Link href={'/'}>
          <p className="font-Script xsm:text-4xl xsm:ml-0 lg:text-5xl lg:ml-10 ">
            RS Shop
          </p>
        </Link>
        <ul className="hidden lg:flex flex-row font-jost text-xl ">
          <motion.li
            className="ml-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href="/">Home</Link>
          </motion.li>
          <motion.li
            className="ml-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href="/products/">Products</Link>
          </motion.li>
          <motion.li
            className="ml-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link href="/about">About Us</Link>
          </motion.li>
          <motion.li
            className="ml-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <a onClick={scrollToFooter} className="cursor-pointer">
              Contact Us
            </a>
          </motion.li>
        </ul>

        {!isLoggedIn ? (
          <>
            <Link href="/login">
              <motion.button
                className="xsm:hidden lg:inline ml-5 p-2 font-jost border w-24 border-black rounded-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Log In
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button
                className="xsm:hidden lg:inline ml-5 w-24 bg-black font-jost text-white p-2 rounded-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Register
              </motion.button>
            </Link>
          </>
        ) : (
          <div className="ml-5 relative">
            <Link href="/cart">
              <button className="xsm:ml-[59px] sm:ml-96 lg:ml-0 p-2 rounded-2xl ">
                <ShoppingCartIcon className="h-8 w-8" />
                {cartItems.length > 0 && (
                  <span className="absolute xsm:right-0 lg:right-14 top-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </Link>
            <button
              className="xsm:hidden lg:inline ml-2 p-2  rounded-2xl"
              onClick={toggleDropdown}
            >
              <UserIcon className="h-8 w-8" />
            </button>
            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute w-48 bg-white border rounded-md shadow-lg z-20"
              >
                <motion.button
                  className="block px-4 py-2 text-left w-full text-gray-700 hover:bg-gray-200"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  Log Out
                </motion.button>
              </div>
            )}
          </div>
        )}
        <div className="lg:hidden">
          <motion.button
            onClick={() => {
              setShow(!show);
              toggleMobileMenu();
            }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-0 p-2"
          >
            <Bars3Icon className="h-8 w-8" />
          </motion.button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-20 left-0 w-full bg-white z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ul className="flex flex-col font-jost text-xl p-5 space-y-4">
                <motion.li
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Link href="/">Home</Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Link href="/products/">Products</Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  About Us
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <a onClick={scrollToFooter} className="cursor-pointer">
                    Contact Us
                  </a>
                </motion.li>
              </ul>
              {!isLoggedIn ? (
                <div className="flex flex-col font-jost text-xl p-5 space-y-4">
                  <Link href="/login">
                    <motion.button
                      className="w-full border border-black rounded-2xl"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      Log In
                    </motion.button>
                  </Link>
                  <Link href="/register">
                    <motion.button
                      className="w-full  bg-black  text-white rounded-2xl"
                      whileHover={{ scale: 1.03 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      Register
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="ml-5 relative">
                  <Link href="/cart">
                    <button className="xsm:hidden p-2 rounded-2xl">
                      <ShoppingCartIcon className="h-8 w-8" />
                      {cartItems.length > 0 && (
                        <span className="absolute top-0 right-14 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                          {cartItems.length}
                        </span>
                      )}
                    </button>
                  </Link>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-jost text-xl pb-3"
                    onClick={handleLogout}
                  >
                    Log Out
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
