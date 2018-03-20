import React from 'react';
import {
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from 'victory';
import styles from './victory.styles';
import './LineChart.css';

const ChildPoint = ({ x, y }) => <text x={x} y={y} fontSize={15}><span role="img" aria-label={`childpoint at (${x}, ${y})`}>🧒</span></text>;
const AdultPoint = ({ x, y }) => <text x={x} y={y} fontSize={15}><span role="img" aria-label={`adultpoint at (${x}, ${y})`}>🤷</span></text>;

export default ({ data, avgData, showChild, showAdult }) => {
  return (
    <div className='Victory__LineChart'>
      <VictoryChart
        domainPadding={{x: 20, y: 20}}
        domain={{y: [0, 1]}}
      >
         <VictoryLine
           style={styles.lineData}
           data={data}
         />
         <VictoryLine
          style={styles.avgData}
          y={() => avgData}
         />
         { showChild && (
           <VictoryScatter
            data={data.filter(datum => datum.child)}
            dataComponent={<ChildPoint />}
           />
         ) }
         { showAdult && (
           <VictoryScatter
            data={data.filter(datum => !datum.child)}
            dataComponent={<AdultPoint />}
           />
          ) }
        <VictoryLabel
          text="value"
          x={0}
          y={175}
          verticalTextAnchor="start"
          labelPlacement="parallel"
        />
      </VictoryChart>
    </div>
  );
};
