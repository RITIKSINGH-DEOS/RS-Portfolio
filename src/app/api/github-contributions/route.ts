import { NextResponse } from "next/server";

export const revalidate = 120; // Cache for 2 minutes for fast updates

export async function GET() {
  const username = "RITIKSINGH-DEOS";
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        headers: {
          "User-Agent": "Portfolio-App",
        },
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch contributions: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      {
        total: { lastYear: 192 },
        contributions: [],
        error: true,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  }
}
