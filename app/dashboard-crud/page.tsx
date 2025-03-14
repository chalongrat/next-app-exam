import Link from "next/link";
import { getTickets } from "./action";

export default async function DashboardPage() {
    // ดึงข้อมูลจาก Server Action
    const tickets = await getTickets();

    // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);

    //     const response = await deleteTicketSt({
    //         ticket_id: Number(formData.get("ticketId")),
    //     });

    //     if (response.success) router.push("/dashboard-crud");
    // }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">📌 รายการใบแจ้งซ่อม</h1>

            {/* 🟢 ปุ่มเพิ่ม Ticket */}
            <div className="my-4">
                <Link href="/dashboard-crud/create">
                    <button className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600">+ เพิ่ม Ticket</button>
                </Link>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Ticket ID</th>
                        <th className="border px-4 py-2">Ticket No</th>
                        <th className="border px-4 py-2">Reporter</th>
                        <th className="border px-4 py-2">Subject</th>
                        <th className="border px-4 py-2">Date Created</th>
                        <th className="border px-4 py-2">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket: any) => (
                        <tr key={ticket.TICKET_ID}>
                            <td className="border px-4 py-2">{ticket.TICKET_ID}</td>
                            <td className="border px-4 py-2">{ticket.TICKET_NO}</td>
                            <td className="border px-4 py-2">{ticket.REPORTER_ID}</td>
                            <td className="border px-4 py-2">{ticket.SUBJECT}</td>
                            <td className="border px-4 py-2">{new Date(ticket.DATE_CREATED).toLocaleString()}</td>
                            <td className="border px-4 py-2 flex space-x-2">
                                <Link href={`/dashboard-crud/edit/${ticket.TICKET_ID}`}>
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-yellow-600">แก้ไข</button>
                                </Link>

                                {/* <form onSubmit={handleSubmit}>
                                    <input type="hidden" name="ticketId" defaultValue={ticket.TICKET_ID} />
                                    <button type="submit" className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600">
                                        ลบ
                                    </button>
                                </form> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
