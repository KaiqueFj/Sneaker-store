import Link from "next/link";

function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl text-primary-600 font-semibold">
        Não foi possivel encontrar essa página :(
      </h1>
      <Link
        href="/"
        className="inline-block px-6 py-3 text-lg bg-accent-500 text-primary-600/70 hover:underline"
      >
        Voltar para a página inicial
      </Link>
    </main>
  );
}

export default NotFound;
