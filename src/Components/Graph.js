import React from 'react';
import { Chart } from 'react-google-charts';

const Graph = () => {
  const chartData = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];

  return (
    <div>
      <Chart
        chartType="Bar"  // Change chartType to "Bar"
        data={chartData}
        options={{
          title: 'My Daily Activities',
          legend: { position: 'none' }, // Optional: Hiding legend for a cleaner look
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default Graph;
