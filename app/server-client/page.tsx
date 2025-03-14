import { executeQuery } from "@/lib/oracle";
import ClientComponent from "./components/clientcomponent";

export default async function ServerClientPage() {
    const tickets = await executeQuery<{ TICKET_ID: number; TICKET_NO: string; SUBJECT: string }>("SELECT TICKET_ID, TICKET_NO, SUBJECT FROM ESV_TICKET FETCH FIRST 5 ROWS ONLY");

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">📌 รายการใบแจ้งซ่อม</h1>
            <ClientComponent tickets={tickets} />
        </div>
    );
}
