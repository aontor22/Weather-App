import { getWeatherClient } from "./WeatherApi";

// Weather data transformation functions

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
  const api = getWeatherClient();
  const raw = await api.getCurrent(q);
  return normalizeCurrent(raw);
}

export async function searchLocations(q) {
  const api = getWeatherClient();
  return api.search(q);
}
