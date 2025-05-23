"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import { jsPDF } from "jspdf";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ); const generatePDF = () => {
    const doc = new jsPDF({
      unit: "mm",
      format: [80, 200], // Format ticket thermique
    });

    const now = new Date();
    const dateStr = now.toLocaleString();

    const logoBase64 = "data:image/jpg;logo,..."; // Remplace par ton logo en base64

    let y = 10;

    // Logo
    doc.addImage(logoBase64, "", 25, y, 30, 15); // centré
    y += 20;

    // Titre
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("FACTURE", 40, y, { align: "center" });
    y += 6;

    // Date/Heure
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(dateStr, 40, y, { align: "center" });
    y += 8;

    // Lignes d'articles
    doc.setFontSize(10);
    doc.setDrawColor(200);
    doc.line(5, y, 75, y);
    y += 3;

    items.forEach((item) => {
      const name = item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name;
      doc.text(`${name} x${item.quantity}`, 5, y);
      doc.text(`${((item.price * item.quantity) / 100).toFixed(2)} €`, 75, y, { align: "right" });
      y += 5;
    });

    y += 2;
    doc.line(5, y, 75, y);
    y += 6;

    // Total
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total", 5, y);
    doc.text(`${(total / 100).toFixed(2)} €`, 75, y, { align: "right" });
    y += 8;

    // Message de remerciement
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Merci pour votre commande !", 40, y, { align: "center" });

    doc.save("facture.pdf");
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
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
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
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant="default" className="w-full">
          Procéder au paiement
        </Button>
        <Button variant="outline" className="w-full mt-4" onClick={generatePDF}>
          Télécharger la facture PDF
        </Button>
      </form>
     
    </div>
  );
}
