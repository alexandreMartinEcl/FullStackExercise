import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
});

class JourneyTable extends PureComponent {
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


  render() {
    const { classes } = this.props;
    const { journeys } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Report period</TableCell>
              <TableCell align="right">Terminal</TableCell>
              <TableCell align="right">Arrival or departure</TableCell>
              <TableCell align="right">Domestic or International</TableCell>
              <TableCell align="right">Passenger count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row"> {row.reportPeriod} </TableCell>
                <TableCell align="right">{row.terminal}</TableCell>
                <TableCell align="right">{row.arrivalDeparture}</TableCell>
                <TableCell align="right">{row.domesticInternational}</TableCell>
                <TableCell align="right">{row.passengerCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

// export default JourneyTable;
export default withStyles(styles)(JourneyTable);
