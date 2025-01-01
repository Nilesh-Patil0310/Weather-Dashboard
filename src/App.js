import { useState } from "react";
import axios from 'axios';
import InputField from "./components/inputField";
import Loader from "./components/loader";
import WeatherChart from "./components/weatherChart";
import WeatherTable from "./components/weatherTable";

const App = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude,
            longitude,
            start_date: startDate,
            end_date: endDate,
            daily: [
              'temperature_2m_max',
              'temperature_2m_min',
              'temperature_2m_mean',
            ].join(','),
            timezone: 'auto',
          },
        }
      );
      setWeatherData(response.data.daily);
    } catch (error) {
      setError('Failed to fetch weather data. Please check your inputs.');
    }
    setLoading(false);
  };

  const isValidInput = () => {
    return latitude && longitude && startDate && endDate;
  };

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Weather Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Latitude"
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
        />
        <InputField
          label="Longitude"
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
        />
        <InputField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <InputField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={fetchWeatherData}
        disabled={!isValidInput() || loading}
      >
        {loading ? 'Loading...' : 'Fetch Weather Data'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {loading && <Loader />}

      {weatherData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Weather Data</h2>
          <WeatherChart
            data={{
              labels: weatherData.time,
              datasets: [
                {
                  label: 'Max Temperature (°C)',
                  data: weatherData.temperature_2m_max,
                  borderColor: 'red',
                  fill: false,
                },
                {
                  label: 'Min Temperature (°C)',
                  data: weatherData.temperature_2m_min,
                  borderColor: 'blue',
                  fill: false,
                },
                {
                  label: 'Mean Temperature (°C)',
                  data: weatherData.temperature_2m_mean,
                  borderColor: 'green',
                  fill: false,
                },
              ],
            }}
          />
          <WeatherTable weatherData={weatherData} />
        </div>
      )}
    </div>
  );
};

export default App;
