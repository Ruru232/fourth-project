import { motion } from 'framer-motion';
import Link from 'next/link';

interface WavyUnderlineLinkProps {
  category: string;
}

const WavyUnderlineLink: React.FC<WavyUnderlineLinkProps> = ({ category }) => {
  return (
    <motion.div className="relative inline-block">
      <Link href={`/products?category=${category}`}>
        <span className="relative z-10">Shop now</span>
      </Link>
      <motion.svg
        className="absolute left-0 -bottom-1 z-0"
        width="100%"
        height="5"
        viewBox="0 0 100 5"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M0,3 Q50,0 100,3"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          whileHover={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </motion.svg>
      <motion.svg
        className="absolute left-0 -bottom-1 z-0"
        width="100%"
        height="5"
        viewBox="0 0 100 5"
        preserveAspectRatio="none"
        fill="none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.path
          d="M5,20 Q25,5 50,20 T95,20 Q75,35 50,20 T5,20"
          stroke="#000"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default WavyUnderlineLink;
