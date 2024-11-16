import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM tracking");
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data from database" },
      { status: 500 }
    );
  }
}
