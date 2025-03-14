"use client";

interface Ticket {
    TICKET_ID: number;
    TICKET_NO: string;
    SUBJECT: string;
}

interface Props {
    tickets: Ticket[];
}

export default function ClientComponent({ tickets }: Props) {
    return (
        <ul className="list-disc pl-5">
            {tickets.map((ticket) => (
                <li key={ticket.TICKET_ID}>
                    <strong>{ticket.TICKET_NO}</strong>: {ticket.SUBJECT}
                </li>
            ))}
        </ul>
    );
}
