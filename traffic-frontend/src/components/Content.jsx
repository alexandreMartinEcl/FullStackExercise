import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { getJourneys, formatJourney } from '../repositories/journey.repository';
import JourneyTable from './JourneyTable';
import TrafficGraph from './TrafficGraph';

const styles = theme => ({
  dataDisplay: {
     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
     margin: 20,
  },
  button: {
    margin: 5,
  }
});

class Content extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    className: ''
  };

  state = {
    dataIsDownloaded: false,
    displayChart: false,
    journeys: [],
  };

  /**
   * Launch request to download traffic data
   */
  handleGetDataClick = () => {
    getJourneys().then(this.updateTable)
  };

  handleDisplayGraphClick = () => {
    let displayChart = !this.state.displayChart;
    this.setState({ displayChart: displayChart });
  };

  /**
   * Will change the data contained in the component DataTable
   */
  updateTable = (res) => {
    this.dataIsDownloaded = true;
    const { success, result } = res;
    const { journeys } = result;
    if (success) {
      this.setState({journeys: journeys.map(formatJourney)});
    } else {
      alert(res.message);
    }
  }

  render() {
    const { className, classes } = this.props;
    const { journeys, displayChart } = this.state;
    return (
      <div className={className}>
        <div>
          <Button
            className={classes.button}
            variant='contained' 
            color='primary'
            onClick={this.handleGetDataClick}>
              Télécharger le traffic
          </Button>

          <Button
            className={classes.button}
            variant='outlined' 
            color='primary'
            onClick={this.handleDisplayGraphClick}>
              {displayChart ? "Afficher le tableau" : "Afficher le graphique"}
          </Button>
        </div>

        {journeys.length ? 
          <div className={classes.dataDisplay}>
            {displayChart ? 
            <TrafficGraph journeys={journeys}></TrafficGraph>
            : <JourneyTable journeys={journeys}></JourneyTable>}
          </div>
          : null
        }

      </div>
    );
  }
}

export default withStyles(styles)(Content);
