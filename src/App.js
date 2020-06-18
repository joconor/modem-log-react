import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode'
import { format, endOfHour, startOfHour, subHours, parseISO, getUnixTime } from 'date-fns'


import './App.css';
import Status from './Status';
import StatusTable from './StatusTable';
import Debug from './Debug';

import { getStatus, getEvents } from './api';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showDebugInfo: false,
      debugInfo: [],
      statusJson: null,
      error: null,
      events: null
    }
  }

  async newSetStatusInfo() {
    try {
      this.setState({ statusJson: await getStatus() });
    } catch (error) {
      this.setState({ error: error.message })
    };
    let to = endOfHour(parseISO(this.state.statusJson.currentStats.lastAnalysisDate));
    let from = startOfHour(subHours(to,23));
    try {
      this.setState({ events: await getEvents(getUnixTime(from), getUnixTime(to)) });
    } catch (error) {
      this.setState({ error: error.message })
    };
  }

  async componentDidMount() {
    this.newSetStatusInfo();
  };

  onSubmit = async () => {
    this.newSetStatusInfo();
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
              {/* <IconButton color="inherit" onClick={this.toggleDevInfo}><DeveloperModeIcon /></IconButton> */}
            </section>
          </Toolbar>
        </AppBar>
        <Box mx={2}>
          { this.state.statusJson ? (
            <Typography>
              Last event collection time was { format(new Date(this.state.statusJson.currentStats.lastCollectionDate), 'pp')}; analysis was { format(new Date(this.state.statusJson.currentStats.lastAnalysisDate), 'pp')}<br />
              The last event collected was at { format(new Date(this.state.statusJson.currentStats.lastInsertionDate), 'pp')}<br />
              FEC over limit count in last 24 hours: {(this.state.statusJson["current24HourDay"].CMStatus16Count) || 0}
            </Typography>
          ) : <br />}
          <Status statusJson={this.state.statusJson} newToOld={false} />
          <Typography>
            <u>All events in the last 24 hours:</u>
          </Typography>
          <StatusTable events={this.state.events} />
          {this.state.showDebugInfo ? (
            <Debug debugInfo={this.state.statusJson} />
          ) : (<br />)}
        </Box>
      </React.Fragment>
    );
  }
}

export default App;
