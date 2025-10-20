import apiClient from '../api/apiClient';

function normalizeCurrent(d) {
  return {
    name: d.location?.name,
    region: d.location?.region,
    country: d.location?.country,
    tz: d.location?.tz_id,
    time: d.location?.localtime,
    temp: Math.round(d.current?.temp_c),
    tempF: Math.round(d.current?.temp_f),
    tempK: Math.round((d.current?.temp_c ?? 0) + 273.15),
    feels: Math.round(d.current?.feelslike_c),
    humidity: d.current?.humidity,
    windKph: d.current?.wind_kph,
    condition: d.current?.condition?.text,
    icon: d.current?.condition?.icon,
    isDay: !!d.current?.is_day,
  };
}

export async function fetchCurrentWeather(q) {
  const response = await apiClient.get('/current.json', {
    params: { q, aqi: 'no' }
  });

  if (!response.ok) {
    throw new Error(response.error);
  }

  return normalizeCurrent(response.data);
}

export async function searchLocations(q) {
  const response = await apiClient.get('/search.json', {
    params: { q }
  });

  if (!response.ok) {
    throw new Error(response.error);
  }

  return Array.isArray(response.data) ? response.data : [];
}