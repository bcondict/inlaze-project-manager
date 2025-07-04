import { APIs } from "@/lib/apis.types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  const res = await fetch(`${APIs.API_GATEWAY}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await res.json();

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: APIs.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, //1 day
  });

  return NextResponse.json({ success: true });
};
