import * as motion from "framer-motion/client";
import Link from "next/link";

export default function Home() {
  return (
    <motion.div className="min-h-screen flex items-center flex-col gap-6 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="text-white font-bold"
      >
        <Link
          href="/products"
          className="p-4 rounded bg-blue-500 hover:bg-blue-700"
        >
          See Products
        </Link>
      </motion.button>
    </motion.div>
  );
}
