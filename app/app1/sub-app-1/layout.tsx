export default function SubApp1Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="text-red-500">Sub App1 Feader</div>
            {children}
            <div className="text-red-500">Footer App1 Feader</div>
        </section>
    );
}
