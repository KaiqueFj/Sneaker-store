import Link from "next/link";
export default function Navigation() {
  return (
    <nav className="flex justify-center">
      <ul className="flex items-center text-lg font-medium text-primary-500 gap-2">
        <li>
          <Link
            href="/"
            className="relative px-4 py-1   hover:border-b-2 hover:border-b-primary-500 "
          >
            <span className="relative z-10">Releases</span>
          </Link>
        </li>

        <li>
          <Link
            href="/transactions"
            className="relative px-4 py-1   hover:border-b-2 hover:border-b-primary-500 "
          >
            <span className="relative z-10">Men</span>
          </Link>
        </li>

        <li>
          <Link
            href="/analytics"
            className="relative px-4 py-1   hover:border-b-2 hover:border-b-primary-500 "
          >
            <span className="relative z-10">Woman</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
