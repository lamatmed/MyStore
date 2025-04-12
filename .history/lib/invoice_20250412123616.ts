import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Assurez-vous d'assigner les fonts après l'importation
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateInvoice = (items: any[], total: number) => {
    const documentDefinition = {
        content: [
            { text: 'Facture', style: 'header' },
            {
                style: 'tableExample',
                table: {
                    widths: ['*', 'auto', 'auto'],
                    body: [
                        ['Article', 'Quantité', 'Prix'],
                        ...items.map(item => [
                            item.name,
                            item.quantity,
                            `€${((item.price * item.quantity) / 100).toFixed(2)}`,
                        ]),
                    ],
                },
            },
            { text: `Total : €${(total / 100).toFixed(2)}`, style: 'total' },
        ],
        styles: {
            header: { fontSize: 18, bold: true, alignment: 'center' },
            tableExample: { margin: [0, 10, 0, 15] },
            total: { fontSize: 16, bold: true, alignment: 'right' },
        },
    };

    // Génération du PDF et téléchargement
    pdfMake.createPdf(documentDefinition).download('facture.pdf');
};
