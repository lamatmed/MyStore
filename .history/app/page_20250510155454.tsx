import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  let products: string | any[] = [];

  try {
    const response = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 5,
    });
    products = response.data;
  } catch (error) {
    console.error("Erreur Stripe pendant le build :", error);
  }

  return (
    <div>
      {/* Section Hero */}
      <section className="rounded bg-neutral-100 py-12">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-16 max-w-7xl">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Bienvenue dans Mon Ecommerce
            </h2>
            <p className="text-lg text-neutral-700">
              Découvrez les derniers produits aux meilleurs prix.
            </p>
            <Button asChild variant="default" className="rounded-full bg-black text-white px-6 py-3">
              <Link href="/products">Parcourir tous les produits</Link>
            </Button>
          </div>

          {products[3]?.images?.[0] && (
            <div className="flex justify-center">
              <Image
                alt={products[3].name}
                src={products[3].images[0]}
                className="rounded-lg shadow-lg"
                width={450}
                height={450}
              />
            </div>
          )}
        </div>
      </section>

      {/* Section Carousel Produits */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Nos produits en vedette
          </h3>
          {products.length > 0 ? (
            <Carousel products={products} />
          ) : (
            <p className="text-center text-gray-500">Aucun produit disponible pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}
