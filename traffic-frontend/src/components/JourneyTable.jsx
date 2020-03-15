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

import { journeyValues } from '../repositories/journey.repository';

const styles = theme => ({
  HeadTableCell: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 14,
  },
  TableCell: {
    fontSize: 14,
  },   
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

  columnLabels = [
    'Report period',
    'Terminal',
    'Arrival or departure',
    'Domestic or international',
    'Passenger count',
  ]

  static defaultProps = {
    className: ''
  };


  render() {
    const { classes } = this.props;
    const { journeys } = this.props;
    const columnLabels = this.columnLabels;
    const values = journeyValues();
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.HeadTableCell}>
              {columnLabels.map( columnLabel => (
                <TableCell align='middle'>{columnLabel}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.map(row => (
              <TableRow className={classes.TableCell}>
              {values.map(val => (
                <TableCell align="left">{row[val]}</TableCell>
              ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(styles)(JourneyTable);
