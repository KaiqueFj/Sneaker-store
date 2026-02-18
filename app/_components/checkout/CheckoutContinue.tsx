"use client";

import Button from "@/app/_components/ui/Button/Button";
import { useCheckout } from "@/context/checkoutContext";
import { useRouter } from "next/navigation";

export default function CheckoutContinue() {
  const { state: checkout } = useCheckout();
  const router = useRouter();

  return (
    <section className="pt-4">
      <Button
        size="lg"
        className="w-full"
        disabled={!checkout.shipping}
        onClick={() => router.push("/checkout/payment")}
      >
        Continuar para o pagamento
      </Button>
    </section>
  );
}
