import React from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import styles from './victory.styles';
import './LineChart.css';

const ChildPoint = ({ x, y }) => <text x={x} y={y} fontSize={15}>🧒</text>;
const AdultPoint = ({ x, y }) => <text x={x} y={y} fontSize={15}>🤷</text>;

export default class LineChart extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  handleZoom = (domain) => {
    this.setState({ selectedDomain: domain });
  };

  handleBrush = (domain) => {
    this.setState({ zoomDomain: domain });
  };

  render() {
    const { data, avgData, showAdult, showChild } = this.props;
    return (
      <div className='Victory__LineChart'>
        <VictoryChart
          className="Victory__DataChart"
          domainPadding={{x: 20, y: 20}}
          domain={{y: [0, 1]}}
          containerComponent={<VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={this.state.zoomDomain}
            onZoomDomainChange={this.handleZoom}
          />
          }
        >
          <VictoryAxis label="Time (s)"  />
          <VictoryAxis
            dependentAxis
            axisLabelComponent={<VictoryLabel dy={-10} />}
            label="Value (%)"
          />
           <VictoryLine
             style={styles.lineData}
             data={data}
           />
           <VictoryLine
             style={styles.avgData}
             y={() => avgData}
             labelComponent={<VictoryTooltip />}
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
        </VictoryChart>
        <VictoryChart
          className="Victory__BrushChart"
          height={10}
          containerComponent={
              <VictoryBrushContainer
                height={10}
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
          <VictoryLine
            style={styles.lineData}
            data={data}
          />
          </VictoryChart>
      </div>
    );
  }

};
