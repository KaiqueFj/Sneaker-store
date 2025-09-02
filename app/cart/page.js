import { Suspense } from "react";
import CartBag from "../_components/cart/CartBag";
import Spinner from "../_components/Spinner/Spinner";

export default function page() {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<Spinner />}>
        <CartBag />
      </Suspense>
    </div>
  );
}
