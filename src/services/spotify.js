import { PAIR_DEVICES } from '../../data/uses';
import axios from 'axios';
import querystring from 'querystring';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
const TOKEN = new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64',
);

const BASE_URL = 'https://api.spotify.com/v1';
const AVAILABLE_DEVICES_ENDPOINT = `${BASE_URL}/me/player/devices`;
const NOW_PLAYING_ENDPOINT = `${BASE_URL}/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `${BASE_URL}/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await axios.post(
    TOKEN_ENDPOINT,
    querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
    {
      headers: {
        Authorization: `Basic ${TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response.data;
};

export const getAvailableDevices = async () => {
  const { access_token } = await getAccessToken();

  const response = await axios.get(AVAILABLE_DEVICES_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const status = response.status;

  if (status === 204 || status > 400) {
    return { status, data: [] };
  }

  const responseData = response.data;

  const devices = responseData?.devices?.map((device) => ({
    name: device.name,
    is_active: device.is_active,
    type: device.type,
    model: PAIR_DEVICES[device?.type]?.model || 'Unknown Device',
    id: PAIR_DEVICES[device?.type]?.id || 'minhtran-device',
  }));

  return {
    status,
    data: devices,
  };
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  const response = await axios.get(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const status = response.status;

  if (status === 204 || status > 400) {
    return { status, isPlaying: false, data: null };
  }

  const responseData = response.data;

  if (!responseData.item) {
    return { status, isPlaying: false, data: null };
  }

  const isPlaying = responseData?.is_playing;
  const album = responseData?.item?.album.name ?? '';
  const albumImageUrl =
    responseData?.item?.album?.images?.find((image) => image?.width === 640)
      ?.url ?? undefined;
  const artist =
    responseData?.item?.artists?.map((artist) => artist?.name).join(', ') ?? '';
  const songUrl = responseData?.item?.external_urls?.spotify ?? '';
  const title = responseData?.item?.name ?? '';

  // Get real-time progress and duration of the song
  const progress = responseData.progress_ms;
  const duration = responseData.item.duration_ms;

  return {
    status,
    isPlaying,
    data: {
      album,
      albumImageUrl,
      artist,
      songUrl,
      title,
      progress,
      duration,
    },
  };
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  const response = await axios.get(`${TOP_TRACKS_ENDPOINT}?limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const status = response.status;

  if (status === 204 || status > 400) {
    return { status, data: [] };
  }

  const responseData = response.data;

  const tracks = responseData.items.map((track) => ({
    album: {
      name: track.album.name,
      image: track.album.images.find((image) => image.width === 64),
    },
    artist: track.artists.map((artist) => artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  return { status, data: tracks };
};
