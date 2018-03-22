import React from 'react';
import { XYPlot, XAxis, YAxis } from 'react-vis';
import './LineChartViz.css';


export default ({ data, avgData }) => {

  return (
    <div className="Viz__LineChart">
      <XYPlot height={100} width={100}>
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );

}
