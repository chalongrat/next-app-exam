"use server";

import { executeQuery } from "@/lib/oracle";

// กำหนด Type สำหรับข้อมูล Ticket
export type Ticket = {
    TICKET_ID: number;
    TICKET_NO: string;
    REPORTER_ID: string;
    SUBJECT: string;
    DATE_CREATED: string;
};

// Server Action ดึงข้อมูลจาก Oracle โดยตรง
export async function getTickets(): Promise<Ticket[]> {
    try {
        const tickets: Ticket[] = await executeQuery("SELECT * FROM ESV_TICKET");
        return tickets;
        // return tickets as Ticket[];
        // return await executeQuery<Ticket>('SELECT * FROM ESV_TICKET');
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return [];
    }
}
