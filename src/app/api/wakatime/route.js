import { getALLTimeSinceToday, getReadStats } from '@/services/wakatime';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export const GET = async () => {
  try {
    const readStatsResponse = await getReadStats();
    const allTimeSinceTodayResponse = await getALLTimeSinceToday();

    const data = {
      ...readStatsResponse.data,
      all_time_since_today: allTimeSinceTodayResponse.data,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
