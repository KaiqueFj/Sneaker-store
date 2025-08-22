import Image from "next/image";
import { useSneaker } from "../Sneakers/sneakerContext";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Cart() {
  const { state } = useSneaker();
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center gap-2">
        <CheckCircleIcon className="w-8 h-10 text-green-500" />
        <span className="text-lg text-primary-500 font-medium">
          Added to bag
        </span>
      </div>

      {state.map((item) => (
        <div className="flex gap-2 flex-row" key={item.id}>
          <div className="w-fit h-fit">
            <Image src={item.image} alt={item.name} width={150} height={150} />
          </div>

          <div className="justify-evenly flex flex-col">
            <h3 className="text-lg font-semibold text-primary-500">
              {item.name}
            </h3>
            <p className="text-lg font-semibold text-primary-500/30">
              {item.category}
            </p>
            <p className="text-lg font-semibold text-primary-500/30">
              Size: {item.size}
            </p>

            <p className="text-lg font-semibold text-primary-500">
              ${item.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
