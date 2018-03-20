import React from 'react';
import './LineChartRecharts.css';
import { LineChart, ScatterChart, CartesianGrid, XAxis, YAxis, Line, Scatter, Brush } from 'recharts';

const ChildPoint = ({ x, y }) => <text x={x} y={y} fontSize={15}>🧒</text>;
const AdultPoint = ({ x, y }) => <text x={x} y={y} fontSize={15}>🤷</text>;

export default class LineChartRecharts extends React.Component {

  render() {
    return (
      <div>
      {(!this.props.showChild && !this.props.showAdult) && (
      <LineChart width={700} height={400} data={this.props.data}>
        <CartesianGrid strokeDasharray="10, 1, 20, 1" />
        <XAxis dataKey='x' />
        <YAxis dataKey='y' />
        <Line type="monotone" dataKey='y' stroke="rebeccapurple" />
        <Line type="monotone" dataKey={() => this.props.avgData} stroke="pink" strokeDasharray="5, 5" />
      </LineChart>)}
      {(this.props.showChild || this.props.showAdult) && (
        <ScatterChart width={700} height={400} data={this.props.data} margin="5 5">
          <CartesianGrid strokeDasharray="10, 1, 20, 1" />
          <XAxis dataKey='x' />
          <YAxis dataKey='y' />
          {this.props.showAdult && (
            <Scatter data={this.props.data.filter(datum => !datum.child)} shape={<ChildPoint />} />
          )}
          {this.props.showChild && (
            <Scatter data={this.props.data.filter(datum => datum.child)} shape={<AdultPoint />} />
          )}
          </ScatterChart>
      )}
      </div>
    );
  }
}
