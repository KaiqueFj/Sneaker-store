import Link from "next/link";
export default function Navigation() {
  const navItems = [
    { label: "Sale", href: "/sneakers/nav/sales" },
    { label: "Releases", href: "/" },
    { label: "Men", href: "/sneakers/nav/men" },
    { label: "Women", href: "/sneakers/nav/women" },
  ];

  return (
    <nav className="flex justify-center">
      <ul className="hidden md:flex items-center text-lg font-normal text-primary-600 gap-2">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="relative px-4 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
