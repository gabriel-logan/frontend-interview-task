import * as motion from "framer-motion/client";
import Link from "next/link";

export default function Home() {
  return (
    <motion.div className="min-h-screen flex items-center flex-col gap-6 justify-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <Link href="/products">See Products</Link>
      </motion.button>
    </motion.div>
  );
}
