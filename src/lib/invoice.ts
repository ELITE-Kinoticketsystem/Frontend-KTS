import jsPDF from 'jspdf';

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: string;
}

export interface Invoice {
  invoiceNumber: string;
  date: string;
  items: InvoiceItem[];
  total: number;
}

export class InvoiceTemplate {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF();
  }

  generateInvoice(invoice: Invoice) {
    this.doc.setFontSize(12);
    this.doc.text('Invoice', 10, 10);

    this.doc.setFontSize(10);
    this.doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 10, 20);
    this.doc.text(`Date: ${invoice.date}`, 10, 30);

    this.doc.setFontSize(12);
    this.doc.text('Description', 10, 50);
    this.doc.text('Quantity', 80, 50);
    this.doc.text('Price', 120, 50);

    let y = 60;
    invoice.items.forEach((item) => {
      this.doc.text(item.description, 10, y);
      this.doc.text(item.quantity.toString(), 80, y);
      this.doc.text(item.price.toString(), 120, y);
      y += 10;
    });

    this.doc.setFontSize(12);
    this.doc.text(`Total: $${invoice.total}`, 10, y + 10);

    this.doc.save('invoice.pdf');
  }
}