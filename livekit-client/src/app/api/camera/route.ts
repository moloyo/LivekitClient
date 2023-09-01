import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const camera = req.nextUrl.searchParams.get("camera");
    const username = req.nextUrl.searchParams.get("username");
    if (!camera) {
        return NextResponse.json({ error: 'Missing "camera" query parameter' }, { status: 400 });
    } else if (!username) {
        return NextResponse.json({ error: 'Missing "username" query parameter' }, { status: 400 });
    }

    return await fetch("http://4.157.40.103/viewcamera/cam01", {
        method: "POST",
        body: JSON.stringify({
            userName: username,
        }),
        headers: {
            "content-type": "application/json",
        },
    })
}