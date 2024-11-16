import { NextResponse } from "next/server";
import db from "../../../../lib/db"; // Adjust path to your actual db import
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";

export async function POST(request: Request) {
  try {
    const { trackingNumber } = await request.json();

    if (!trackingNumber || typeof trackingNumber !== "string") {
      return NextResponse.json({ error: "Invalid tracking number" }, { status: 400 });
    }

    console.log("Fetching parcel data for tracking number:", trackingNumber);

    // Fetch data from the database
    const [rows]: [any[], any] = await db.query(
      "SELECT tracking_number, sender_name, sender_surname, sender_postal, receiver_name, receiver_surname, receiver_postal, type FROM parcel_records WHERE tracking_number = ?",
      [trackingNumber]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Tracking number not found" }, { status: 404 });
    }

    const parcel = rows[0];

    if (!parcel.tracking_number) {
      console.error("Invalid tracking number retrieved from the database:", parcel.tracking_number);
      return NextResponse.json({ error: "Invalid data from the database" }, { status: 500 });
    }

    // Generate QR Code
    const qrCodeData = await QRCode.toDataURL(parcel.tracking_number);

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();

    const { StandardFonts } = require('pdf-lib');
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    // Add parcel information to the PDF
    page.drawText(`Tracking Number: ${parcel.tracking_number}`, {
      x: 50,
      y: height - 50,
      size: fontSize,
      font,
    });
    page.drawText(`Sender: ${parcel.sender_name} ${parcel.sender_surname}`, {
      x: 50,
      y: height - 80,
      size: fontSize,
      font,
    });
    page.drawText(`Receiver: ${parcel.receiver_name} ${parcel.receiver_surname}`, {
      x: 50,
      y: height - 110,
      size: fontSize,
      font,
    });
    page.drawText(`Sender Postal: ${parcel.sender_postal}`, {
      x: 50,
      y: height - 140,
      size: fontSize,
      font,
    });
    page.drawText(`Receiver Postal: ${parcel.receiver_postal}`, {
      x: 50,
      y: height - 170,
      size: fontSize,
      font,
    });
    page.drawText(`Type: ${parcel.type}`, {
      x: 50,
      y: height - 200,
      size: fontSize,
      font,
    });

    // Draw the QR code
    const qrImage = await pdfDoc.embedPng(qrCodeData);
    page.drawImage(qrImage, {
      x: width - 150,
      y: height - 250,
      width: 100,
      height: 100,
    });

    const pdfBytes = await pdfDoc.save();

    // Return PDF as a response
    return new NextResponse(pdfBytes, {
      headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=envelope.pdf" },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}