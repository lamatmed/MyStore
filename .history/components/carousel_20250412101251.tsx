"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-xl shadow-xl border-none w-full max-w-2xl mx-auto h-[350px] sm:h-[400px] md:h-[450px]">
      {currentProduct.images?.[0] && (
        <div className="relative w-full h-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            fill
            style={{ objectFit: "cover" }}
            className="transition-opacity duration-500 ease-in-out"
            priority
          />
        </div>
      )}

      <CardContent className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
        <CardTitle className="text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg mb-2">
          {currentProduct.name}
        </CardTitle>
        {price?.unit_amount && (
          <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold drop-shadow">
            {(price.unit_amount / 100).toFixed(2)} $
          </p>
        )}
      </CardContent>
    </Card>
  );
};
