const PDFGenerator = require("pdfkit");
const fs = require("fs");

class InvoiceGenerator {
  constructor(invoice) {
    this.invoice = invoice;
  }

  generateHeaders(doc) {
    const billingAddress = this.invoice.addresses.billing;
    doc.registerFont("GEO", "./bpg_glaho_sylfaen.ttf");
    doc
      .font("GEO")
      .image("./300x300.png", 0, 0, { width: 200 })
      .fillColor("#000")
      .fontSize(20)
      .text("ანალიზი", 275, 50, { align: "right" })
      .fontSize(10)
      .text(`გაცემის თარიღი: ${this.invoice.dueDate}`, { align: "right" })
      .text(`გადახდილი თანხა: $${this.invoice.subtotal - this.invoice.paid}`, {
        align: "right",
      })
      .moveDown()
      .text(
        `Billing Address:\n ${billingAddress.name}\n${billingAddress.address}\n${billingAddress.city}\n${billingAddress.state},${billingAddress.country}, ${billingAddress.postalCode}`,
        { align: "right" }
      )
      .moveDown()
      .moveDown();

    const beginningOfPage = 50;
    const endOfPage = 550;

    doc.moveTo(beginningOfPage, 215).lineTo(endOfPage, 215).stroke();
  }

  generateTable(doc) {
    const tableTop = 270;
    const itemCodeX = 50;
    const descriptionX = 160;
    const priceX = 300;

    // doc
    // .fontSize(10)
    // .text("ანალიზის დასახელება", itemCodeX, tableTop, { bold: true })
    // .text("პასუხი", descriptionX, tableTop)
    // .text("ფასი", priceX, tableTop);
    const beginningOfPage = 200;
    const endOfPage = 400;
    const items = this.invoice.items;
    let i = 0;

    for (i = 0; i < items.length; i++) {
      const item = items[i];
      const y = tableTop + 25 + i * 25;

      doc
        .fontSize(10)
        .moveDown()
        .text(item.itemName, { align: "center" })
        .moveDown();
      doc.text(item.answer, 0, y, { align: "center" });
      // .text(item.answer, descriptionX, y)
      // .text(`$ ${item.price}`, priceX, y);
    }
  }

  generateFooter(doc) {
    doc.fontSize(10).text(`Payment due upon receipt. `, 50, 700, {
      align: "center",
    });
  }

  generate() {
    let theOutput = new PDFGenerator();

    console.log(this.invoice);

    const fileName = `Invoice ${this.invoice.invoiceNumber}.pdf`;

    // pipe to a writable stream which would save the result into the same directory
    theOutput.pipe(fs.createWriteStream(fileName));

    this.generateHeaders(theOutput);

    theOutput.moveDown();

    this.generateTable(theOutput);

    this.generateFooter(theOutput);

    // write out file
    theOutput.end();
  }
}

module.exports = InvoiceGenerator;
