'use client';
import { useSneaker } from '@/context/SneakerContext';
import { CheckCircleIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button/Button';

export default function CartModal() {
  const { state } = useSneaker();
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const [visible, setVisible] = useState(false);
  const lastItemOnCart = state.lastAdded;
  const prevLengthRef = useRef(totalItems);
  const modalRef = useRef(null);

  useEffect(() => {
    if (totalItems > prevLengthRef.current) {
      // Item was added → open modal
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000000);

      return () => clearTimeout(timer);
    }
    prevLengthRef.current = totalItems;
  }, [totalItems]);

  // Close the modal if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    }

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary-600/50 "></div>

      {/* Modal content */}

      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-md bg-white rounded-xl ml-auto mr-6 self-start p-5 shadow-lg "
      >
        <div className="flex flex-col w-full gap-7  ">
          <div className="flex flex-row justify-between  items-center gap-2">
            <div className="flex gap-2 items-center">
              <CheckCircleIcon className="w-8 h-10 text-green-500" />
              <span className="text-lg text-primary-600 font-medium">Adicionado à sacola</span>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="flex  flex-row cursor-pointer items-center justify-center bg-primary-600/10  text-primary-600 px-2 rounded-full hover:bg-primary-600/10 transition hover:text-red-500"
            >
              <XMarkIcon className="w-6 h-10" />
            </button>
          </div>

          {lastItemOnCart && (
            <div className="flex gap-2 flex-col" key={lastItemOnCart.id}>
              <div className="flex gap-1 flex-row">
                {/* Image */}
                <div className="w-fit h-fit">
                  <Image src={lastItemOnCart.image} alt={lastItemOnCart.name} width={120} height={100} />
                </div>
                {/* Sneaker info */}
                <div className=" flex flex-col">
                  <h3 className="text-lg font-semibold text-primary-600">{lastItemOnCart.name}</h3>
                  <p className="text-lg font-semibold text-primary-600">{lastItemOnCart.category}</p>
                  <p className="text-lg font-semibold text-primary-600">Tamanho: {lastItemOnCart.size}</p>

                  <p className="text-lg font-semibold text-primary-600">R${lastItemOnCart.price}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex w-3/4 self-center flex-col items-center gap-4">
                <Link className=" w-full py-2" href="/cart">
                  <Button size="md" className="w-full flex items-center flex-row justify-center py-3" variant="primary">
                    Ver sacola ({totalItems})
                    <ShoppingCartIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Button size="md" className="w-full  py-3" variant="secondary">
                  Finalizar compra
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
