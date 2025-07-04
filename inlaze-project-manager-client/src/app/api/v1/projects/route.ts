import { APIs } from "@/lib/apis.types";
import { NextResponse } from "next/server";

export const GET = async () => {
  const projectsResUrl = `${APIs.API_GATEWAY}/manager/projects`;
  const projectsRes = await fetch(projectsResUrl);

  if (!projectsRes.ok) {
    return NextResponse.json(
      { error: "Error reading the projects" },
      { status: 401 },
    );
  }

  return await projectsRes.json();
};
