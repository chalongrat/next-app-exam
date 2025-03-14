interface PageProps {
    params: Promise<{ slug: number }>;
}

export default function BlogPage({ params }: { params: { slug?: any[] } }) {
    if (!params.slug) {
        return <p>กำลังโหลดข้อมูล...</p>;
    }

    return (
        <div>
            <p>ค่าที่ส่งมาใน URL: {JSON.stringify(params.slug)}</p>
            <ul>
                {params.slug.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
