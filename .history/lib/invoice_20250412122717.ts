// lib/invoice.ts
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function generateInvoice(items: CartItem[], total: number) {
  const today = new Date().toLocaleDateString();

  const docDefinition = {
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
              {},
              {},
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
  };

  pdfMake.createPdf(docDefinition).download("facture.pdf");
}
