import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Sneakers Store</h1>
      <Image src="/sneakers.jpg" alt="Sneakers" width={500} height={500} />
    </main>
  );
}
