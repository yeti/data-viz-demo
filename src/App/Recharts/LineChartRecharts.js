import React from 'react';
import './LineChartRecharts.css';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Line, Scatter, Tooltip } from 'recharts';

const ChildPoint = ({ x, y }) => <text x={x} y={y} fontSize={15}>🧒</text>;
const AdultPoint = ({ x, y }) => <text x={x} y={y} fontSize={15}>🤷</text>;

export default ({ data, avgData, showAdult, showChild }) => (
  <div className="Recharts__LineChart">
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="10, 1, 20, 1" />
        <XAxis dataKey='x' name="x" />
        <YAxis dataKey='y' domain={[0, 1]} />
        <Line type='monotone' dataKey='y' stroke="orange" name="y" />
        <Line dataKey={() => avgData} stroke="green" strokeDasharray="5, 5" name="Average Data" />
        {showAdult && (
          <Scatter data={data.filter(datum => !datum.child)} shape={<AdultPoint />} />
        )}
        {showChild && (
          <Scatter data={data.filter(datum => datum.child)} shape={<ChildPoint />} />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);
