export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.1.243:3000";

export const API_ENDPOINTS = {
  sonKonumlar: `${API_BASE_URL}/api/son-konumlar`,
} as const;
