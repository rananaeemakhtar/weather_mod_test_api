const transform = (response) => {
    // Map raw weather API response to the required structure.
    // Expected response shape based on WeatherAPI:
    // {
    //   location: { name, country, ... },
    //   current: { temp_c, feelslike_c, condition: { text, icon }, humidity, wind_kph, last_updated }
    // }
    const location = response.location || {};
    const current = response.current || {};

    // Helper to safely get nested values with fallback.
    const safe = (val, fallback = null) => (val !== undefined && val !== null ? val : fallback);

    // Parse the fetched time to ISO format (UTC). WeatherAPI provides a string like "2026-06-11 10:00".
    let fetchedAt = null;
    if (typeof current.last_updated === 'string') {
        // Assume the provided time is in the server's local timezone; convert to ISO string.
        const dt = new Date(current.last_updated.replace(' ', 'T') + 'Z');
        if (!isNaN(dt)) {
            fetchedAt = dt.toISOString();
        }
    }

    return {
        city: safe(location.name),
        country: safe(location.country), // API gives full country name; keep as‑is.
        temperature: {
            current: safe(current.temp_c),
            feelsLike: safe(current.feelslike_c),
            unit: 'celsius',
        },
        condition: {
            label: safe(current?.condition?.text),
            icon: safe(current?.condition?.icon),
        },
        details: {
            humidity: safe(current.humidity),
            windSpeed: safe(current.wind_kph),
            windUnit: 'km/h',
        },
        fetchedAt,
    };
};

module.exports = { transform };