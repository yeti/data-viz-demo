import React from 'react';
import PropTypes from 'prop-types';
import { makeWidthFlexible, makeHeightFlexible, RadialChart } from 'react-vis';
import './PieChartViz.css';

const DataPie = ({ data, width, height, toggleShowAdult, toggleShowChild, reset }) => {

  return (
    <RadialChart
      data={data}
      width={width}
      height={height}
      labelsAboveChildren
      onValueMouseOver={(context) => {
        switch (context.label) {
          case 'Adults':
            toggleShowAdult();
            break;
          case 'Children':
            toggleShowChild();
            break;
          default:
            return;
        }
      }}
      onValueMouseOut={() => {
        reset();
      }}
    />
  );
}

DataPie.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.any,
  toggleShowAdult: PropTypes.any,
  toggleShowChild: PropTypes.any,
  reset: PropTypes.any,
};

const Pie = makeWidthFlexible(makeHeightFlexible(DataPie));

export default ({ data, toggleShowAdult, toggleShowChild, reset }) => {

  const children = data.filter(datum => datum.child);
  const adults = data.filter(datum => !datum.child);

  const pieData = [
    { angle: children.length, label: 'Children' },
    { angle: adults.length, label: 'Adults' },
  ];

  return (
    <div className="Viz__PieChart">
      <Pie data={pieData} toggleShowAdult={toggleShowAdult} toggleShowChild={toggleShowChild} reset={reset} animation />
    </div>
  );

};
