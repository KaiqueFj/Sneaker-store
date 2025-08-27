import Image from "next/image";
import { useSneaker } from "../Sneakers/SneakerContext";
import {
  CheckCircleIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Cart() {
  const { state } = useSneaker();
  const [visible, setVisible] = useState(false);
  const lastItemOnCart = state[state.length - 1];
  const totalItems = state.reduce((acc, item) => acc + item.quantity, 0);

  console.log("cart items", state);
  console.log("cart items length", state.length);
  console.log("last item on cart", lastItemOnCart);
  console.log("total items in cart", totalItems);

  useEffect(() => {
    if (state.length > 0) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000000);

      return () => clearTimeout(timer);
    }
  }, [state]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 "></div>

      {/* Modal content */}

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl ml-auto mr-6 self-start p-5 shadow-lg ">
        <div className="flex flex-col w-full gap-7  ">
          <div className="flex flex-row justify-between  items-center gap-2">
            <div className="flex gap-2 items-center">
              <CheckCircleIcon className="w-8 h-10 text-green-500" />
              <span className="text-lg text-primary-500 font-medium">
                Added to bag
              </span>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="flex  flex-row cursor-pointer items-center justify-center bg-primary-500/10  text-primary-500 px-2 rounded-full hover:bg-primary-500/10 transition hover:text-red-500"
            >
              <XMarkIcon className="w-6 h-10" />
            </button>
          </div>

          {lastItemOnCart && (
            <div className="flex gap-2 flex-col" key={lastItemOnCart.id}>
              <div className="flex gap-1 flex-row">
                {/* Image */}
                <div className="w-fit h-fit">
                  <Image
                    src={lastItemOnCart.image}
                    alt={lastItemOnCart.name}
                    width={120}
                    height={100}
                  />
                </div>
                {/* Sneaker info */}
                <div className=" flex flex-col">
                  <h3 className="text-lg font-semibold text-primary-500">
                    {lastItemOnCart.name}
                  </h3>
                  <p className="text-lg font-semibold text-primary-500/30">
                    {lastItemOnCart.category}
                  </p>
                  <p className="text-lg font-semibold text-primary-500/30">
                    Size: {lastItemOnCart.size}
                  </p>

                  <p className="text-lg font-semibold text-primary-500">
                    ${lastItemOnCart.price}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-4">
                <button className="flex flex-row font-semibold items-center h-14 justify-center bg-black w-11/12  text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                  View bag ({totalItems})
                  <ShoppingCartIcon className="ml-2 h-5 w-5" />
                </button>

                <button className="flex gap-2 flex-row  w-11/12 items-center h-14 justify-center border-primary-500/20 border-2  text-primary-500 px-4 rounded-full hover:bg-primary-500/10 transition hover:text-red-500">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
