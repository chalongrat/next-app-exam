import { getTickets } from "./action";
import TicketList from "./components/ticketList";

export default async function ParentComponent() {
    const tickets = await getTickets();

    return (
        <div>
            <TicketList tickets={tickets} />
        </div>
    );
}
