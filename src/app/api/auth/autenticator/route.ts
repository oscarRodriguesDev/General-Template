import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (email === "admin@example.com" && password === "admin123") {
      return NextResponse.json({ id: 1, name: "Admin User", email });
    }

    // Se a verificação falhar
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch (error) {
    console.error("Error in authentication:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

