import { NextResponse } from 'next/server';

export const GET =  async (Req : Request) => {
  return NextResponse.json({ hello: 'Next.js' });
}

export const Post =  async (Req : Request) => {
  return NextResponse.json({ hello: 'Next.js' });
}

export const PUT =  async (Req : Request) => {
  return NextResponse.json({ hello: 'Next.js' });
}
