import { useRouter } from "next/navigation";
import { insertTicket } from "../action";

export function useSaveTicket() {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const response = await insertTicket({
            ticket_no: Number(formData.get("ticket_no")),
            reporter_id: Number(formData.get("reporter_id")),
            priority_id: Number(formData.get("priority_id")),
            subject: formData.get("subject") as string,
            description: formData.get("description") as string,
            location: formData.get("location") as string,
            status_id: 1,
            date_created: new Date().toISOString().slice(0, 19).replace("T", " "),
            user_created: formData.get("user_created") as string,
            tel_contact: formData.get("tel_contact") as string,
        });

        if (response.success) router.push("/dashboard-crud");
    }

    return { handleSubmit };
}
