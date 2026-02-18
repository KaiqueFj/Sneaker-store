import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src="/_assets/logo/store-logo.png"
        alt="Logo"
        width={60}
        height={60}
      />
      <span className=" hidden text-lg md:flex lg:text-xl font-bold text-primary-600">
        Shark Store
      </span>
    </Link>
  );
}
