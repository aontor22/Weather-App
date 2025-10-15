import { useEffect, useState } from "react";
import { fetchCurrentWeather, searchLocations } from "../services/WeatherService";

export function useWeather(defaultCity = "Dhaka") {
    const [city, setCity] = useState(defaultCity);
    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, scetError] = useState("");

    async function load(q = city) {
        try {
            setLoading(true);
            setError("");
            const data = await fetchCurrentWeather(q);
            setCurrent(data);
        } catch (e) {
            setError(String(e.message || e));
            setCurrent(null);
        } finally {
            setLoading(false);
        }
    }

    async function suggest(q) {
        if (!q?.trim()) return [];
        try { return await searchLocations(q); }
        catch { return []; }
    }

    useEffect(() => { load(defaultCity); }, [defaultCity]);

    return { city, setCity, current, loading, error, load, suggest };
}
