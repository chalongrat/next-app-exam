"use server";
import { executeQuery } from "@/lib/oracle";

// 🔵 SELECT: ดึงข้อมูลทั้งหมด
export async function getTickets() {
    try {
        const tickets = await executeQuery(`
      SELECT TICKET_ID, TICKET_NO, REPORTER_ID, PRIORITY_ID, SUBJECT, DESCRIPTION, 
             LOCATION, STATUS_ID, DATE_CREATED, USER_CREATED, TEL_CONTACT
      FROM ESV_TICKET ORDER BY TICKET_ID DESC
    `);
        return tickets;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return [];
    }
}

interface TicketData {
    ticket_no: number;
    reporter_id: number;
    priority_id: number;
    subject: string;
    description: string;
    location: string;
    status_id: number;
    date_created: string;
    user_created: string;
    tel_contact: string;
}

// 🟢 INSERT: เพิ่ม Ticket ลงฐานข้อมูล
export async function insertTicket(ticket: TicketData) {
    try {
        await executeQuery(`
      INSERT INTO ESV_TICKET (
        TICKET_NO, REPORTER_ID, PRIORITY_ID, SUBJECT, DESCRIPTION, LOCATION, 
        STATUS_ID, DATE_CREATED, USER_CREATED, TEL_CONTACT
      ) VALUES (
        '${ticket.ticket_no}', ${ticket.reporter_id}, ${ticket.priority_id}, 
        '${ticket.subject}', '${ticket.description}', '${ticket.location}', 
        ${ticket.status_id}, TO_DATE('${ticket.date_created}', 'YYYY-MM-DD HH24:MI:SS'), 
        '${ticket.user_created}', '${ticket.tel_contact}'
      )
    `);

        return { success: true, message: "Ticket added successfully!" };
    } catch (error) {
        console.error("Error inserting ticket:", error);
        return { success: false, message: "Failed to add ticket." };
    }
}

// 🟢 ฟังก์ชันลบ Ticket
// export async function deleteTicket(ticketId: number) {
//     try {
//         await executeQuery(`DELETE FROM ESV_TICKET WHERE TICKET_ID = ${ticketId}`);
//         return { success: true, message: "Ticket deleted successfully!" };
//     } catch (error) {
//         console.error("Error deleting ticket:", error);
//         return { success: false, message: "Failed to delete ticket." };
//     }
// }

// export async function deleteTicketSt(ticket: { ticket_id: number }) {
//     try {
//         await executeQuery(`
//       UPDATE ESV_TICKET
//       SET STATUS_ID = -1
//       WHERE TICKET_ID = ${ticket.ticket_id}
//     `);
//         return { success: true, message: "Ticket delete successfully!" };
//     } catch (error) {
//         console.error("Error updating ticket:", error);
//         return { success: false, message: "Failed to update ticket." };
//     }
// }

interface Params {
    ticketId: number;
}

// 🟡 ดึงข้อมูล Ticket ตาม ID
export async function getTicketById({ ticketId }: Params) {
    try {
        const query = `SELECT * FROM ESV_TICKET WHERE TICKET_ID = :ticketId`; // ใช้ Bind Variables ป้องกัน SQL Injection
        const result = await executeQuery(query, [ticketId]);
        return result;
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return null;
    }
}

// 🟢 อัปเดต Ticket
export async function updateTicket(ticket: { ticket_id: number; ticket_no: string; subject: string }) {
    try {
        await executeQuery(`UPDATE ESV_TICKET 
                            SET TICKET_NO = '${ticket.ticket_no}', SUBJECT = '${ticket.subject}'
                            WHERE TICKET_ID = ${ticket.ticket_id}`);

        return { success: true, message: "Ticket updated successfully!" };
    } catch (error) {
        console.error("Error updating ticket:", error);
        return { success: false, message: "Failed to update ticket." };
    }
}
