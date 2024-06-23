import { NextResponse } from "next/server";
export async function POST(req: any, res: any) {
  return NextResponse.json({ message: 'Upload successful' }, { status: 200 })
}
