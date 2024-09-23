import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link
        href="/products"
        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
      >
        See Products
      </Link>
    </div>
  );
}
