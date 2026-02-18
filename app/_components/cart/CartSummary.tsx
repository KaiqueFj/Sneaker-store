"use client";

import Button from "@/app/_components/ui/Button/Button";
import { useCheckout } from "@/context/checkoutContext";
import { useSneaker } from "@/context/SneakerContext";
import { createOrder } from "@/services/orders-service";
import { formatCurrency } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartSummary() {
  const { state, dispatch } = useSneaker();
  const { state: checkout } = useCheckout();
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const discountPercentage = checkout.cupom?.value ?? 0;
  const shippingPrice = checkout.shipping ? checkout.shipping.price : null;
  const isAuthenticated = !!session?.user?.userId;

  const isCheckoutPage =
    pathname.includes("/checkout/payment") || pathname.includes("/checkout");

  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const total =
    subtotal + shippingPrice - (subtotal * discountPercentage) / 100;

  const discountValue =
    discountPercentage > 0 ? (subtotal * discountPercentage) / 100 : 0;

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Você precisa entrar primeiro!");
      router.push("/login");
      return;
    }

    router.push("/checkout");
  };

  const handleOrderBtn = async () => {
    if (!isAuthenticated) return;

    await toast.promise(
      createOrder({
        cartItems: state.items,
        total_price: total,
        address: checkout.address,
      }).then((order) => {
        dispatch({ type: "CLEAR_CART" });
        router.push("/account/orders/thankyou");
        return order;
      }),
      {
        loading: "Salvando seu pedido...",
        success: "Pedido salvo com sucesso!",
        error: "Não foi possível concluir o pedido! Tente novamente!",
      },
    );
  };

  return (
    <div className="bg-white border border-primary-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-primary-600 mb-5">
        Resumo do pedido
      </h2>

      <div className="flex flex-col gap-3 py-4 border-t border-b border-primary-200">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-sm text-primary-400">Subtotal</span>
          <span className="font-medium text-primary-600">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Frete */}
        <div className="flex justify-between">
          <span className="text-sm text-primary-400">Frete</span>

          {checkout.shipping ? (
            <span className="font-medium text-primary-600">
              {checkout.shipping.price === 0
                ? "Grátis"
                : formatCurrency(checkout.shipping.price)}
            </span>
          ) : (
            <span className="text-sm text-primary-400">-</span>
          )}
        </div>

        {/* Coupon */}
        {checkout.cupom && (
          <div className="flex justify-between text-sm text-green-600">
            <span>
              Cupom aplicado
              <span className="ml-1 font-medium uppercase">
                ({checkout.cupom.code ?? `${discountPercentage}% de desconto`})
              </span>
            </span>
            <span className="font-medium">
              -{formatCurrency(discountValue)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 pt-1">
        <span className="text-base font-semibold text-primary-600">Total</span>
        <span className="text-2xl font-bold text-primary-600">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="mt-1 ">
        {isCheckoutPage && state.items.length > 0 ? (
          <Button
            onClick={() => handleOrderBtn()}
            variant="primary"
            size="md"
            className="mt-4 w-full py-3.5"
            pendingLabel="Processando..."
          >
            Finalizar compra
          </Button>
        ) : (
          <>
            <Button
              variant="primary"
              size="md"
              className="w-full mt-4 py-3.5"
              onClick={() => handleProceedToCheckout()}
            >
              Ir para finalizar compra
            </Button>

            <Button
              variant="secondary"
              size="md"
              className="w-full mt-4 py-3.5"
              onClick={() => router.push("/")}
            >
              Continuar comprando
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
