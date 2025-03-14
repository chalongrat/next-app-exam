export default function App1Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="text-green-500">Sub Feader</div>
            {children}
            <div className="text-green-500">Sub Feader</div>
        </section>
    );
}
