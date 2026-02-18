import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Page() {
  return (
    <div className=" mx-auto flex flex-col items-center text-center ">
      <CheckCircleIcon className="w-20 h-20 text-green-500 mb-6" />

      <h1 className="text-4xl font-bold text-gray-900">
        Obrigado pelo seu pedido!
      </h1>

      <p className="text-lg text-gray-600 mt-3 max-w-md">
        Sua compra foi realizada com sucesso. Você pode ver o status e os
        detalhes do seu pedido a qualquer momento.
      </p>

      <Link
        href="/account/orders"
        className="mt-8 inline-block bg-primary-600 hover:bg-primary-600/40 text-primary-50 text-lg font-medium py-3 px-6 rounded-xl transition-all shadow-sm"
      >
        Gerenciar pedidos →
      </Link>
    </div>
  );
}
