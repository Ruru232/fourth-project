import Link from 'next/link';
import { FaCcPaypal } from 'react-icons/fa';
import { FaCcVisa } from 'react-icons/fa';
import { FaCcMastercard } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer id="contact-us">
      <div className="flex justify-center mt-10 bg-charcoal text-white p-10">
        <div className="flex xsm:flex-col lg:flex-row">
          <ul className="flex flex-col justify-center items-center">
            <li className="font-Script font-bold text-5xl">
              <Link href={'/'}>RS Shop</Link>
            </li>
            <li className="font-jost text-xl text-center">
              Electronics, Jewelery, Men's & Women's clothing
            </li>
          </ul>
          <ul className="flex flex-col justify-center font-jost ml-10 text-lg xsm:mt-10 lg:mt-0">
            <li>About RS Shop</li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>Careers</li>
            <li>FAQs</li>
          </ul>
          <ul className="flex flex-col justify-center font-jost ml-10 text-lg xsm:mt-10 lg:mt-0">
            <li>Store Details</li>
            <li>Phone number: 09-123-456-789 / 812-345-678</li>
            <li>Address: Lot 123 Manila, Philippines, 1234</li>
            <li>Email: RSshop@domain.com</li>
          </ul>
          <ul className="flex flex-col justify-center font-jost ml-10 text-lg xsm:mt-10 lg:mt-0">
            <li>Follow us!</li>
            <li className="flex flex-row">
              <FaFacebookSquare className="h-8 w-8" /> @RSshopFB
            </li>
            <li className="flex flex-row">
              <FaInstagram className="h-8 w-8" /> @RSshopIG
            </li>
            <li className="flex flex-row">
              <FaXTwitter className="h-8 w-8" /> @RSshopTwitter
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center text-slate-950">
        <FaCcPaypal className="h-14 w-14" />
        <FaCcVisa className="h-14 w-14 ml-2" />
        <FaCcMastercard className="h-14 w-14 ml-2" />
      </div>
      <div className="flex justify-center items-center">
        <h2 className="font-jost text-black text-center">
          Copyright © RS Shop all rights reserved. Powered by Codebility.
        </h2>
      </div>
    </footer>
  );
}
