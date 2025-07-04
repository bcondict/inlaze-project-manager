import { APIs } from "@/lib/apis.types";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  const user = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date().toJSON(),
    updatedAt: new Date().toJSON(),
  };

  console.log("user", user);

  const url = `${APIs.API_GATEWAY}/api/v1/auth/register`;
  console.log("url", url);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  console.log("res", res);

  if (!res.ok) {
    return NextResponse.json({ error: "Error creating user" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
};
