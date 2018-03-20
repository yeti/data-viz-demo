import React, { Component } from 'react';
import './App.css';
import LineChart from './VictoryCharts/LineChart';
import SegmentChart from './VictoryCharts/SegmentChart';
import LineChartRecharts from './Recharts/LineChartRecharts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      data: [],
      showChild: false,
      showAdult: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      const y = Math.random();
      const isChild = Math.random() > 0.5;
      this.setState({
        data: [
          ...this.state.data,
          {
            x: this.state.x,
            y,
            child: isChild,
          },
        ],
        x: this.state.x + 1
      });
    }, 1000);
  }

  toggleShowChild = () => {
    this.setState({
      showChild: !this.state.showChild,
    });
  };

  toggleShowAdult = () => {
    this.setState({
      showAdult: !this.state.showAdult,
    });
  };

  render() {
    const ySum = this.state.data.map(datum => datum.y).reduce((acc, start) => acc + start, 0);
    const avgData = ySum / this.state.data.length;

    return (
      <div className="App">
        <h1>Chart Implementations</h1>
        <button onClick={() => {this.setState({ x: 0, data: []})}}>Reset Data</button>
        <h2>
          <a href="https://formidable.com/open-source/victory" target="_blank">
            Victory Charts
          </a>
        </h2>
        <section className="App__subsection App__victory">
          <LineChart
            data={this.state.data}
            avgData={avgData}
            showChild={this.state.showChild}
            showAdult={this.state.showAdult}
          />
          <SegmentChart
            data={this.state.data}
            avgData={avgData}
            toggleShowChild={this.toggleShowChild}
            toggleShowAdult={this.toggleShowAdult}
          />
        </section>
        <h2>
          <a href="http://recharts.org/#/en-US/" target="_blank">
            Recharts
          </a>
        </h2>
        <section className="App__subsection App__recharts">
          <LineChartRecharts
            data={this.state.data}
            avgData={avgData}
            showChild={this.state.showChild}
            showAdult={this.state.showAdult}
          />
        </section>
      </div>
    );
  }
}

export default App;
