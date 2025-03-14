"use client";

import Link from "next/link";
import { useSaveTicket } from "./save";

export default function CreateTicketPage() {
    const { handleSubmit } = useSaveTicket();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">เพิ่มข้อมูล Ticket</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="ticket_no" placeholder="Ticket No" required className="border p-2 w-full" />
                <input type="number" name="reporter_id" defaultValue="6500000064" required className="border p-2 w-full" />
                <input type="number" name="priority_id" placeholder=" 1 2 3 4" required className="border p-2 w-full" />
                <input type="text" name="subject" defaultValue="เบรคสบัด" required className="border p-2 w-full" />
                <textarea name="description" defaultValue="ครัชเสีย" required className="border p-2 w-full"></textarea>
                <input type="text" name="location" defaultValue="ศูนย์คอม" required className="border p-2 w-full" />
                <input type="text" name="user_created" defaultValue="6500000064" required className="border p-2 w-full" />
                <input type="text" name="tel_contact" defaultValue="73476" required className="border p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-400">
                    บันทึก
                </button>

                <Link href={`/dashboard-crud`}>
                    <button className="bg-gray-500 text-white p-2 rounded cursor-pointer hover:bg-gray-400">ย้อนกลับ</button>
                </Link>
            </form>
        </div>
    );
}
