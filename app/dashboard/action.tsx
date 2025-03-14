"use server";
import { executeQuery } from "@/lib/oracle";

// Server Action ดึงข้อมูลจาก Oracle โดยตรง
export async function getTickets() {
    try {
        const tickets = await executeQuery("SELECT * FROM ESV_TICKET");
        return tickets;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return [];
    }
}
