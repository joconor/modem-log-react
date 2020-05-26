import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode'


import './App.css';
import Status from './Status';
import Debug from './Debug';

import { getStatus } from './api';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showDebugInfo: false,
      debugInfo: [],
      statusJson: null,
      error: null
    }
  }

  setStatusInfo() {
    getStatus(
      (result) => {
        this.setState({
          statusJson: result
        })
      },
      (error) => {
        this.setState({
          error: error.message
        })
      }
    )
  }

  componentDidMount() {
    this.setStatusInfo();
  }

  onSubmit = () => {
    this.setStatusInfo();
  }

  toggleDevInfo = () => {
    this.setState({
      showDebugInfo: !this.state.showDebugInfo
    });
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
            <section style={{ marginLeft: 'auto', marginRight: -12 }}>
              <IconButton color="inherit" onClick={this.onSubmit}><RefreshIcon /></IconButton>
              <IconButton color="inherit" onClick={this.toggleDevInfo}><DeveloperModeIcon /></IconButton>
            </section>
          </Toolbar>
        </AppBar>
        <Box mx={2}>
          <Status statusJson={this.state.statusJson} />
          {this.state.showDebugInfo ? (
            <Debug debugInfo={this.state.statusJson} />
          ) : (<br />)}
        </Box>
      </React.Fragment>
    );
  }
}


export default App;
