import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './App.css';
import Status from './Status';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hosts: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Cable Modem Health Dashboard
          </Typography>
          </Toolbar>
        </AppBar>
        <Box mx={2}>
          <Status />
        </Box>
      </React.Fragment>
    );
  }
}


export default App;
