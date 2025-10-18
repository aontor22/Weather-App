/**
 * @copyright 2025 Udoy Chowdhury
 * @license Apache-2.0
 */




const API_KEY = (typeof import.meta !== "undefined" && import.meta.env?.VITE_WEATHERAPI_KEY) || "abdeb32ec42446a1b9752120251510";

const BASE = "https://api.weatherapi.com/v1";

let _instance = null;
let _counter = 0;

class WeatherClient {
    constructor(apiKey) {
        if (!apiKey) throw new Error("Missing WeatherAPI key");
        this.apiKey = apiKey;
        this.instanceId = ++_counter;
    }
    
    async getCurrent(q, opts = { aqi: "no" }) {
        const url = `${BASE}/current.json?key=${this.apiKey}&q=${encodeURIComponent(q)}&aqi=${opts.aqi ?? "no"}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
        return data;
    }

    async search(q) {
        const url = `${BASE}/search.json?key=${this.apiKey}&q=${encodeURIComponent(q)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
        return Array.isArray(data) ? data : [];
    }
}

export function getWeatherClient() {
    if (!_instance) {
        _instance = new WeatherClient(API_KEY);
    }
    return _instance;
}


