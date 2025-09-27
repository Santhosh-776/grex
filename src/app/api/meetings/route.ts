export async function GET(request: Request) {
    return new Response(JSON.stringify({ message: "Meetings API" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(request: Request) {
    const data = await request.json();
    // Here you would typically handle the creation of a new meeting
    return new Response(JSON.stringify({ message: "Meeting created", data }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}

export async function PUT(request: Request) {
    const data = await request.json();
    // Here you would typically handle the update of an existing meeting
    return new Response(JSON.stringify({ message: "Meeting updated", data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
