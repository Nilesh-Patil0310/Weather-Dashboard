import React from 'react';

const WeatherTable = ({ weatherData }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Max Temp (°C)</th>
            <th className="px-4 py-2">Min Temp (°C)</th>
            <th className="px-4 py-2">Mean Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.time.map((date, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{date}</td>
              <td className="border px-4 py-2">{weatherData.temperature_2m_max[index]}</td>
              <td className="border px-4 py-2">{weatherData.temperature_2m_min[index]}</td>
              <td className="border px-4 py-2">{weatherData.temperature_2m_mean[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
