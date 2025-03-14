"use client";
import { useEffect, useState } from "react";

export default function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTickets() {
            try {
                const response = await fetch("/api/tickets");
                const result = await response.json();
                if (result.success) {
                    setTickets(result.data);
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTickets();
    }, []);

    //   if (loading) return <p>กำลังโหลดข้อมูล...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">📌 รายการใบแจ้งซ่อม</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Ticket ID</th>
                        <th className="border px-4 py-2">Ticket No</th>
                        <th className="border px-4 py-2">Reporter</th>
                        <th className="border px-4 py-2">Subject</th>
                        <th className="border px-4 py-2">Date Created</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
