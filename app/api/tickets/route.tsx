"use server";

import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/oracle";

export async function GET() {
    try {
        const data = await executeQuery("SELECT * FROM ESV_TICKET"); // ตัวอย่างการดึงข้อมูล
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: "error" }, { status: 500 });
    }
}
