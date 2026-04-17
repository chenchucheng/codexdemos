import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    apiConfigured: Boolean(process.env.DEEPSEEK_API_KEY),
  });
}
