"use client";

import type { TDocumentDefinitions } from "pdfmake/interfaces";

// Fonction pour générer la facture PDF
export async function generateInvoice(items: any[], total: number) {
    try {
        // Importation dynamique de pdfMake et des fonts
        const { default: pdfMake } = await import("pdfmake/build/pdfmake");
        const { default: pdfFonts } = await import("pdfmake/build/vfs_fonts");

        // Vérification de l'existence de pdfMake et pdfFonts
        if (pdfMake && pdfFonts) {
            pdfMake.vfs = pdfFonts.pdfMake.vfs; // Associer les fonts

            const today = new Date().toLocaleDateString();

            // Définition du contenu de la facture
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

            // Générer et télécharger la facture
            pdfMake.createPdf(docDefinition).download("facture.pdf");
        } else {
            console.error("Erreur lors du chargement de pdfMake ou des fonts");
        }
    } catch (error) {
        console.error("Erreur lors de la génération de la facture:", error);
    }
}
