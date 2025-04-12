"use client";

import { TDocumentDefinitions } from "pdfmake/interfaces";

// Fonction pour générer la facture PDF
export async function generateInvoice(items: any[], total: number) {
    // Importation dynamique des modules uniquement côté client
    if (typeof window !== "undefined") {
        const pdfMakeModule = await import("pdfmake/build/pdfmake");
        const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

        const pdfMake = pdfMakeModule.default;
        const pdfFonts = pdfFontsModule.default;

        // Vérification si pdfMake et pdfFonts sont correctement chargés
        if (pdfMake && pdfFonts) {
            // Assigner les fonts
            pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

            // Générer et télécharger la facture PDF
            pdfMake.createPdf(docDefinition).download("facture.pdf");
        } else {
            console.error("Erreur lors du chargement de pdfMake ou des fonts.");
        }
    }
}
