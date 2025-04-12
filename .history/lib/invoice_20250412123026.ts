"use client";

import type { TDocumentDefinitions } from "pdfmake/interfaces";

// On charge pdfMake et les fonts dynamiquement
export async function generateInvoice(items: any[], total: number) {
    const pdfMakeModule = await import("pdfmake/build/pdfmake");
    const pdfFonts = await import("pdfmake/build/vfs_fonts");

    // Attache les fonts correctement
    pdfMakeModule.default.vfs = pdfFonts.default.pdfMake.vfs;

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

    pdfMakeModule.default.createPdf(docDefinition).download("facture.pdf");
}
