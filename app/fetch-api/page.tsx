"use client";

import { useEffect, useState } from "react";

async function getUser() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
        throw new Error("Network Error");
    }

    return res.json();
}

export default function Content() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getUser().then(setData);
    }, []);

    return (
        <div>
            {data.map((user: any) => (
                <div key={user.id}>
                    <h5>{user.name}</h5>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
}
