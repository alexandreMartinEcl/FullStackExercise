import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import './App.css';
import theme from './theme';
import Content from './components/Content';

const styles = (theme) => ({
});


class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Content className={classes.content}/>
        </MuiThemeProvider>
      </div>
    );
  }
}


export default withStyles(styles)(App);
// export default App;
