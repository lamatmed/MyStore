"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { TDocumentDefinitions } from "pdfmake/interfaces";

// Fonction pour générer la facture PDF
export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const generateInvoice = () => {
    if (typeof window !== "undefined") {
      // Charger dynamiquement pdfmake sans polices externes
      import("pdfmake/build/pdfmake").then((pdfMakeModule) => {
        const pdfMake: any = pdfMakeModule.default;

        // Vérification si pdfMake est bien chargé
        if (pdfMake) {
          const today = new Date().toLocaleDateString();

          const docDefinition: TDocumentDefinitions = {
            content: [
              { text: "Facture", style: "header" },
              { text: `Date : ${today}`, alignment: "right", margin: [0, 0, 0, 10] },
              {
                table: {
                  widths: ["*", "auto", "auto", "auto"],
                  body: [
                    ["Produit", "Prix unitaire", "Quantité", "Total"],
                    ...items.map((item) => [
                      item.name,
                      `${(item.price / 100).toFixed(2)} €`,
                      item.quantity,
                      `${((item.price * item.quantity) / 100).toFixed(2)} €`,
                    ]),
                    [
                      { text: "Total général", colSpan: 3, alignment: "right", bold: true },
                      {}, {},  // Cellules vides pour les autres colonnes
                      { text: `${(total / 100).toFixed(2)} €`, bold: true },
                    ],
                  ],
                },
                layout: "lightHorizontalLines",
                margin: [0, 10, 0, 10],
              },
              { text: "Merci pour votre achat !", style: "footer" },
            ],
            styles: {
              header: {
                fontSize: 24,
                bold: true,
                marginBottom: 10,
              },
              footer: {
                marginTop: 30,
                italics: true,
                alignment: "center",
                fontSize: 12,
              },
            },
            defaultStyle: {
              font: "Helvetica", // Utilisation de la police par défaut
            },
          };

          // Générer et télécharger la facture PDF
          pdfMake.createPdf(docDefinition).download("facture.pdf");
        } else {
          console.error("Erreur lors du chargement de pdfMake.");
        }
      }).catch((error) => {
        console.error("Erreur lors du chargement de pdfMake :", error);
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Résumé de la commande</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    €{((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: €{(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-md mx-auto space-y-4">
        <Button
          type="button"
          variant="default"
          className="w-full"
          onClick={generateInvoice}
        >
          Télécharger la facture PDF
        </Button>

        <form action="#">
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button type="submit" variant="outline" className="w-full">
            Procéder au paiement
          </Button>
        </form>
      </div>
    </div>
  );
}
