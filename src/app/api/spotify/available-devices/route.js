import { getAvailableDevices } from '@/services/spotify';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export const GET = async () => {
  try {
    const response = await getAvailableDevices();

    return NextResponse.json(response?.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
