'use server';
import { executeQuery } from '@/lib/oracle';

interface Params {
  id: number;
}

// Server Action ดึงข้อมูลจาก Oracle โดยตรง
export async function getTickets({ id }: Params) {
  try {
    const tickets = await executeQuery(`SELECT * FROM ESV_TICKET WHERE TICKET_ID = ${id}`);
    return tickets; 
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
}


