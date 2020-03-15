import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ReactHighcharts from 'react-highcharts';
import theme from '../theme';

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
        name: "Arrivals",
        data: null,
        color: theme.palette.primary.main,
      },{
        name: "Departures",
        data: null,
        color: theme.palette.secondary.main,
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
        name: "Arrivals",
        color: theme.palette.primary.main,
      },
      {
        data: null,
        name: "Departures",
        color: theme.palette.secondary.main,
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

    configPassengerCounts.series = passCountSeries;
    configPassengerCounts.xAxis.categories = passCountCategories;

    let dataArrivals = Object.keys(dctTerminalData).map(k => [k, dctTerminalData[k].arrivals]);
    let dataDepartures = Object.keys(dctTerminalData).map(k => [k, dctTerminalData[k].departures]);
    configTerminals.series[0].data = dataArrivals;
    configTerminals.series[1].data = dataDepartures;
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