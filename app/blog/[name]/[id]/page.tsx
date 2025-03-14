export default async function Page({ params }: { params: Promise<{ name: string; id: number }> }) {
    const { name } = await params;
    const { id } = await params;

    return (
        <div>
            <h1>My name: {name}</h1>
            <p>My id : {id}</p>
        </div>
    );
}
