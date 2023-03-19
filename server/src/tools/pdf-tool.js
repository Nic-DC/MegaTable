import PdfPrinter from "pdfmake";

export const getPdfReadableStream = (tableData) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      italics: "Helvetica-Italic",
      bolditalics: "Helvetica-BoldItalic",
    },
  };

  const printer = new PdfPrinter(fonts);

  const tableRows = tableData.map((record) => [
    record.column1,
    record.column2,
    record.column3,
    record.column4,
    record.column5,
  ]);

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [40, 60, 40, 60],
    header: {
      columns: [
        {
          text: "Table Data",
          alignment: "right",
          fontSize: 18,
          margin: [0, 10, 40, 10],
        },
      ],
      margin: [40, 20, 40, 20],
    },
    content: [
      {
        text: "Table Data",
        style: "header",
        alignment: "center",
        fontSize: 28,
        margin: [0, 20, 0, 20],
      },
      {
        table: {
          headerRows: 1,
          body: [["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"], ...tableRows],
        },
        layout: "lightHorizontalLines",
        margin: [0, 10, 0, 20],
      },
    ],
    styles: {
      header: {
        fontSize: 20,
        color: "#0077b6",
      },
    },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();

  return pdfReadableStream;
};
