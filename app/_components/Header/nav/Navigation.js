import Link from "next/link";
export default function Navigation() {
  return (
    <nav className="flex justify-center">
      <ul className="flex items-center text-lg font-medium text-primary-500 gap-2">
        <li>
          <Link
            href="/"
            className="relative px-4 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            <span className="relative z-10">Sale</span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="relative px-4 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            <span className="relative z-10">Releases</span>
          </Link>
        </li>

        <li>
          <Link
            href="/sneakers/nav/men"
            className="relative px-4 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            <span className="relative z-10">Men</span>
          </Link>
        </li>

        <li>
          <Link
            href="/sneakers/nav/women"
            className="relative px-4 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            <span className="relative z-10">Woman</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
