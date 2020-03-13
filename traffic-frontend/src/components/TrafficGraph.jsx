import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactHighcharts from 'react-highcharts';

import { computePassCountCategories, getCategory} from '../services/GraphShaper';

const styles = theme => ({
});

class TrafficGraph extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    journeys: PropTypes.arrayOf(PropTypes.shape({
      reportPeriod: PropTypes.Date,
      terminal: PropTypes.String,
      arrivalDeparture: PropTypes.String,
      domesticInternational: PropTypes.String,
      passengerCount: PropTypes.number,
    }))
  };

  static defaultProps = {
    className: ''
  };

  state = {
    configTerminals: {
      chart: {
        type:'column'
      },
      title: {
        text: "Arrivals/departures by terminal",
      },
      xAxis: {
        categories: [],
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)'
        }
      },
      series: [{
        name: "Arrival/Departure rate",
        data: null,
      }],
    },
    configPassengerCounts: {
      title: {
        text: "Passengers by type of flight",
      },
      xAxis: {
        categories: [],
      },
      series: [{
        data: null,
        name: "Arrivals"
      },
      {
        data: null,
        name: "Departures"
      }],
    }
  }

  componentWillMount() {
    let { configTerminals, configPassengerCounts } = this.state;
    let passCountCategories = computePassCountCategories(this.props.journeys);


    let passCountSeries = configPassengerCounts.series;
    passCountSeries.forEach(serie => serie.data = new Float32Array(passCountCategories.length));

    let dctTerminalData = {};
    this.props.journeys.forEach(j => {
      let serie = j.domesticInternational === "Domestic" ? passCountSeries[0] : passCountSeries[1];
      serie.data[getCategory(j)]++;

      if (!dctTerminalData[j.terminal]) {
        dctTerminalData[j.terminal] = {
          'arrivals': 0,
          'departures': 0
        };
      }
      j.arrivalDeparture === "Arrival" ? dctTerminalData[j.terminal].arrivals++ : dctTerminalData[j.terminal].departures++;
    });

    console.log(dctTerminalData)
    configPassengerCounts.series = passCountSeries;
    configPassengerCounts.xAxis.categories = passCountCategories;

    let dataTerminals = Object.keys(dctTerminalData).map(k => [k, dctTerminalData[k].arrivals / dctTerminalData[k].departures]);
    console.log(dataTerminals)
    configTerminals.series[0].data = dataTerminals;
    configTerminals.xAxis.categories = Object.keys(dctTerminalData);

    this.setState({ configTerminals, configPassengerCounts });
  }

  render() {
    const { configTerminals, configPassengerCounts } = this.state;
    return (
      <div >
        <ReactHighcharts config={configTerminals}>

        </ReactHighcharts>
        <ReactHighcharts config={configPassengerCounts}>

        </ReactHighcharts>
      </div>
    );
  }
}

export default withStyles(styles)(TrafficGraph);