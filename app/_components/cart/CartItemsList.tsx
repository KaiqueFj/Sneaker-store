"use client";

import { useSneaker } from "@/context/SneakerContext";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function CartItemList({ variant = "full", editable = false }) {
  const { state, dispatch } = useSneaker();

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-primary-600 font-bold text-lg">Produtos</h1>

      {state.items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-primary-200">
          <p className="text-primary-400 text-base">Seu carrinho está vazio</p>
          <p className="text-sm text-primary-400 mt-2">
            Adicione alguns tênis para começar
          </p>
        </div>
      ) : (
        state.items.map((sneaker) => (
          <div
            key={`${sneaker.id}-${sneaker.size}`}
            className={`bg-white rounded-xl border border-primary-200 p-4 hover:shadow-lg transition-all duration-200`}
          >
            {variant === "compact" ? (
              // --- COMPACT VARIANT ---
              <div className="flex gap-4 items-start">
                {/* IMAGE */}
                <Link href={`/sneaker/${sneaker.id}`} className="w-20 shrink-0">
                  <Image
                    src={sneaker.image}
                    alt={sneaker.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                </Link>

                {/* INFO */}
                <div className="flex flex-col gap-1 text-sm text-primary-400">
                  <Link href={`/sneaker/${sneaker.id}`}>
                    <h3 className="font-semibold text-primary-600 hover:text-primary-600 transition-colors">
                      {sneaker.name}
                    </h3>
                  </Link>
                  <span>Quantidade: {sneaker.quantity}</span>
                  <span>Categoria: {sneaker.category}</span>
                  <span>Cor: {`${sneaker.colors}`.split(",").join(", ")}</span>
                  <span>Tamanho: {sneaker.size}</span>
                </div>
              </div>
            ) : (
              // --- FULL VARIANT (original) ---
              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto_auto] gap-6 items-center">
                {/* IMAGE */}
                <Link
                  href={`/sneaker/${sneaker.id}`}
                  className="w-full md:w-30"
                >
                  <Image
                    src={sneaker.image}
                    alt={sneaker.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                </Link>

                {/* INFO */}
                <div className="flex flex-col gap-1">
                  <Link href={`/sneaker/${sneaker.id}`}>
                    <h3 className="font-semibold text-primary-600 hover:text-primary-600 transition-colors">
                      {sneaker.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-primary-400">
                    Categoria: {sneaker.category}
                  </p>

                  <p className="text-sm text-primary-400">
                    Cores: {`${sneaker.colors}`.split(",").join(", ")}
                  </p>

                  <p className="text-sm text-primary-400">
                    Tamanho {sneaker.size}
                  </p>
                </div>

                {/* QUANTITY */}
                {editable && (
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-3 bg-primary-50 rounded-lg px-3 py-2">
                      {sneaker.quantity === 1 ? (
                        <button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: sneaker,
                            })
                          }
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            dispatch({
                              type: "DECREASE_QUANTITY",
                              payload: sneaker,
                            })
                          }
                          className="text-primary-600 hover:text-primary-500 transition-colors"
                        >
                          <MinusCircleIcon className="h-5 w-5" />
                        </button>
                      )}

                      <span className="font-semibold text-primary-600 w-5 text-center">
                        {sneaker.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch({ type: "ADD_TO_CART", payload: sneaker })
                        }
                        className="text-primary-600 hover:text-primary-500 transition-colors"
                      >
                        <PlusCircleIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* PRICE */}
                <div className="text-right md:text-right">
                  <p className="font-semibold text-primary-600 text-base">
                    R$ {sneaker.price.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
