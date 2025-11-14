import Link from "next/link";

export default function Page() {
  return (
    <div className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">Thank you for your order!</h1>
      <Link
        href="/account/orders"
        className="inline-block text-xl underline text-accent-500"
      >
        Manage your orders &rarr;
      </Link>
    </div>
  );
}
