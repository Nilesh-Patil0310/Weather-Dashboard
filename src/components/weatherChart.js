import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

const WeatherChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <Chart
        type="line"
        data={data}
      />
    </div>
  );
};

export default WeatherChart;