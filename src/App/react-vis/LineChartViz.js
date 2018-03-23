import React from 'react';
import PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, MarkSeries, makeWidthFlexible, makeHeightFlexible } from 'react-vis';
import './LineChartViz.css';

const makeAvgData = (dataSet, avgData) => dataSet.map(datum => ({ ...datum, y: avgData }));

const Plot = ({ data, avgData, width, height, showChild, showAdult }) => (
  <XYPlot width={width} height={height} animation>
    <VerticalGridLines />
    <HorizontalGridLines />
    <LineSeries data={data} color="orange" strokeWidth="2" curve="curveMonotoneX" />
    <LineSeries data={makeAvgData(data, avgData)} color="green" strokeWidth="2" strokeDasharray="5, 5" />
    {showChild && (
      <MarkSeries data={data.filter(datum => datum.child)} color="orange" />
    )}
    {showAdult && (
      <MarkSeries data={data.filter(datum => !datum.child)} color="pink" />
    )}
    <XAxis title="Time (s)"/>
    <YAxis hideLine title="Value (%)"/>
  </XYPlot>
);

Plot.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  data: PropTypes.any,
  showChild: PropTypes.bool,
  showAdult: PropTypes.bool,
};

const FlexPlot = makeHeightFlexible(makeWidthFlexible(Plot));

export default ({ data, avgData, showChild, showAdult }) => {
  return (
    <div className="Viz__LineChart">
      <FlexPlot data={data} avgData={avgData} showChild={showChild} showAdult={showAdult} />
    </div>
  );

}
// <FlexPlot data={filteredData} height={300} />
