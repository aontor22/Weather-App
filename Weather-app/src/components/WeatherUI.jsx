import { useWeather } from "../hooks/useWeather";
import "./Weather.css"
import React from 'react'

const WeatherUI = () => {
    const { city, setCity, current, loading, error, load } = useWeather("Dhaka");

    return (
        <div className="container">
            <div id="inside-container" style={{ padding: 24, color: "#f9d3b4", background: "#212426" }}>
                <h1>WeatherNow</h1>

                <div className="search">
                    <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Search city (e.g., Dhaka)"
                    />
                    <button onClick={() => load(city)}>Search</button>
                </div>

                {loading && <p>Loading…</p>}
                {error && <p style={{ color: "tomato" }}>{error}</p>}

                {current && (
                    <div className="card">
                        <h2>{current.name}, {current.country}</h2>
                        <img src={`https:${current.icon}`} alt={current.condition} />
                        <div style={{ fontSize: 48 }}>{current.temp}°C</div>
                        <div>{current.condition}</div>
                        <small>Feels {current.feels}°C • Humidity {current.humidity}% • Wind {current.windKph} kph</small>
                        <div>{current.time}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherUI
