import { NextResponse } from 'next/server';
import { getDockets } from '@/lib/store';

export async function GET() {
  return NextResponse.json({ success: true, dockets: getDockets() });
}
