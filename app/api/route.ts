import { NextRequest, NextResponse as Response } from "next/server";

export async function GET(req: NextRequest) {
  return Response.json({
    id: "55",
  });
}
