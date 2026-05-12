import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Link
        href="/product/detail"
        className="px-4 py-2 bg-yellow-400 border border-yellow-600 text-black text-sm font-bold rounded-md hover:bg-yellow-500 hover:border-yellow-700 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        to product detail
      </Link>
    </main>
  );
}
