"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { use } from "react";
import { getTicketById, updateTicket } from "../../action";
import { useRouter } from "next/navigation";

// interface PageProps {
//     params: {
//         slug: number;
//     };
// }

interface PageProps {
    params: Promise<{ slug: number }>;
}

export default function EditTickerPage({ params }: PageProps) {
    const router = useRouter();
    // สร้าง state สำหรับเก็บ ticket
    const [ticket, setTicket] = useState<any>(null);
    const parm = use(params);

    useEffect(() => {
        async function fetchData() {
            const tickets = await getTicketById({ ticketId: parm.slug });

            // ตรวจสอบว่า tickets มีข้อมูลก่อนเซ็ตค่า
            if (tickets && tickets.length > 0) {
                setTicket(tickets[0]); // ดึงค่าตัวแรกจาก array
            }
        }

        fetchData();
    }, [parm.slug]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const response = await updateTicket({
            ticket_id: Number(parm.slug),
            ticket_no: formData.get("ticket_no") as string,
            subject: formData.get("subject") as string,
        });

        if (response.success) router.push("/dashboard-crud");
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">แก้ไข Ticket</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="ticket_no" defaultValue={ticket ? ticket.TICKET_NO : ""} required className="border p-2 w-full" />
                <input type="text" name="subject" defaultValue={ticket ? ticket.SUBJECT : ""} required className="border p-2 w-full" />
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
