import React, { Component } from 'react';
import './App.css';
// Victory implementations
import LineChart from './VictoryCharts/LineChart';
import SegmentChart from './VictoryCharts/SegmentChart';
import StackedBar from './VictoryCharts/StackedBar';

// Recharts implementations
import LineChartRecharts from './Recharts/LineChartRecharts';
import PieChartRecharts from './Recharts/PieChartRecharts';

// React-viz Implementations
import LineChartViz from './react-vis/LineChartViz';
import PieChartViz from './react-vis/PieChartViz';

const DateFinders = ({ setFrom, setTo, fromVal, toVal }) => (<div className="App__range-inputs">
    <h4>Data Range Finders</h4>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <input
        type="number"
        name="from value"
        placeholder="data points from:"
        onChange={setFrom}
        value={fromVal}
      />
      <input
        type="number"
        name="to value"
        placeholder="up to:"
        onChange={setTo}
        value={toVal}
      />
    </div>
</div>);

class App extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      data: [],
      showChild: false,
      showAdult: false,
      from: null,
      to: null,
    };
  }

  getDataInRange = () => {
    const { data, from, to } = this.state;
    return (from && to && data.slice(from, to)) || data;
  };

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

  resetScatter = () => {
    this.setState({
      showChild: false,
      showAdult: false,
    });
  };

  toggleShowChild = () => {
    this.setState({
      showChild: true,
    });
  };

  toggleShowAdult = () => {
    this.setState({
      showAdult: true,
    });
  };

  render() {
    const ySum = this.state.data.map(datum => datum.y).reduce((acc, start) => acc + start, 0);
    const avgData = ySum / this.state.data.length;

    return (
      <div className="App">
        <h1>Charting Library Implementations with React</h1>
        <div>
          <button className="App__reset" onClick={() => {this.setState({ x: 0, data: []})}}>Reset Data</button>
        </div>
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
          <StackedBar
            data={this.state.data}
            avgData={avgData}
          />
          <SegmentChart
            data={this.state.data}
            avgData={avgData}
            toggleShowChild={this.toggleShowChild}
            toggleShowAdult={this.toggleShowAdult}
            reset={this.resetScatter}
          />
        </section>
        <h2>
          <a href="http://recharts.org/#/en-US/" target="_blank">
            Recharts
          </a>
        </h2>
        <section className="App__subsection App__recharts">
          <LineChartRecharts
            data={this.getDataInRange()}
            avgData={this.getDataInRange().reduce((acc, val) => acc + val.y, 0) / this.getDataInRange().length}
            showChild={this.state.showChild}
            showAdult={this.state.showAdult}
          />
          <DateFinders
            setFrom={(ev) => this.setState({from: ev.target.value})}
            setTo={(ev) => this.setState({to: ev.target.value})}
            fromVal={this.state.from}
            toVal={this.state.to}
          />
          <PieChartRecharts
            data={this.state.data}
            avgData={avgData}
            toggleShowChild={this.toggleShowChild}
            toggleShowAdult={this.toggleShowAdult}
            reset={this.resetScatter}
          />
        </section>
        <h2>
          <a href="https://uber.github.io/react-vis/" target="_blank">
            React-Vis
          </a>
        </h2>
        <section className="App__subsection App_reactvis">
          <LineChartViz
            data={this.getDataInRange()}
            avgData={this.getDataInRange().reduce((acc, val) => acc + val.y, 0) / this.getDataInRange().length}
            showChild={this.state.showChild}
            showAdult={this.state.showAdult}
          />
          <DateFinders
            setFrom={(ev) => this.setState({from: ev.target.value})}
            setTo={(ev) => this.setState({to: ev.target.value})}
            fromVal={this.state.from}
            toVal={this.state.to}
          />
          <PieChartViz
            data={this.state.data}
            avgData={avgData}
            toggleShowChild={this.toggleShowChild}
            toggleShowAdult={this.toggleShowAdult}
            reset={this.resetScatter}
          />
        </section>
      </div>
    );
  }
}

export default App;
