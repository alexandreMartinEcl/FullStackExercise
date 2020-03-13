import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { getJourneys, formatJourney } from '../repositories/journey.repository';
import JourneyTable from './JourneyTable';
import TrafficGraph from './TrafficGraph';

const styles = theme => ({
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

  componentDidUpdate() {
    console.log('yes'); 
  }

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

  updateTable = (res) => {
    console.log(res)
    this.dataIsDownloaded = true;
    const { success, result } = res;
    const { journeys } = result;
    if (success) {
      this.setState({journeys: journeys.map(formatJourney)});
      console.log(this.state.journeys);
    } else {
      console.log(res.message);
      alert(res.message);
    }
  }

  render() {
    const {className} = this.props;
    const { journeys, displayChart } = this.state;
    return (
      <div className={className}>
        <div>
          <Button
            onClick={this.handleGetDataClick}>
              Télécharger le traffic
          </Button>

          <Button
            onClick={this.handleDisplayGraphClick}>
              {displayChart ? "Afficher le tableau" : "Afficher le graphique"}
          </Button>
        </div>

        <div>
          {journeys.length && displayChart && (<TrafficGraph journeys={journeys}></TrafficGraph>)}
          {journeys.length && !displayChart && (<JourneyTable journeys={journeys}></JourneyTable>)}
        </div>

      </div>
    );
  }
}

export default withStyles(styles)(Content);
