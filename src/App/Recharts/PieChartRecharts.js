
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import './PieChartRecharts.css';

const randomColor = () => Math.floor(Math.random() * 256).toString(16);
const rgb = () => `#${randomColor()}${randomColor()}${randomColor()}`;

const colors = [ rgb(), rgb(), rgb(), rgb() ];

const ToolTip = ({ name, portion }) => (
  <div>
    <p>Name: {name}</p>
    <p>Better than Average: {portion}</p>
  </div>
);

export default ({ data, toggleShowAdult, toggleShowChild, reset, avgData }) => {

  const children = data.filter(datum => datum.child);
  const adults = data.filter(datum => !datum.child);

  const childrenBetterThanAve = children.filter(datum => datum.y > avgData);
  const adultBetterThanAve = adults.filter(datum => datum.y > avgData);

  const numIsChild = children.length;
  const numIsOther = adults.length;
  const segmentData = [
    { name: 'Child',
      value: numIsChild,
      color: colors[0],
      innerColor: colors[2],
      portion: childrenBetterThanAve / numIsChild,
    },
    { name: 'Other',
      value: numIsOther,
      color: colors[1],
      innerColor: colors[3],
      portion: adultBetterThanAve / numIsOther,
    },
  ];

  const totalRadius = 100;

  const onMouseEnter = (ev) => {
    switch (ev.name) {
      case 'Child':
        toggleShowChild();
        break;
      case 'Other':
        toggleShowAdult();
        break;
    }
  }

  return (
    <div className="Recharts__PieChart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            nameKey="name"
            data={segmentData}
            dataKey="value"
            onMouseEnter={onMouseEnter}
            onMouseLeave={reset}
            outerRadius={totalRadius}
            label
          >
            {segmentData.map((datum) => <Cell fill={datum.color} />)}
          </Pie>
          {segmentData.map((datum) => <Tooltip content={({ name, portion }) => (
            <div>
              <p>Name: {name}</p>
              <p>Better than Average: {portion}</p>
            </div>
          )} />)}
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
