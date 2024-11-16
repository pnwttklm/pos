import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM parcel_records"); // Replace with your table name
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data from database" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      tracking_number,
      sender_name,
      sender_surname,
      sender_address,
      sender_postal,
      receiver_name,
      receiver_surname,
      receiver_address,
      receiver_postal,
      weight,
      price,
      type,
      insurance,
    } = body;

    const [result] = await db.query(
      "INSERT INTO parcel_records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        tracking_number,
        sender_name,
        sender_surname,
        sender_address,
        sender_postal,
        receiver_name,
        receiver_surname,
        receiver_address,
        receiver_postal,
        weight,
        price,
        type,
        insurance,
      ]
    );

    return NextResponse.json({ message: "Item added" });
  } catch (error) {
    console.error("Error during POST request:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to add item", details: errorMessage },
      { status: 500 }
    );
  }
}