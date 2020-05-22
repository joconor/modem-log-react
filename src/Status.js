import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { getStatus } from './api';

const theme = createMuiTheme({
  typography: {
    body2: {
      fontSize: 10
    }
  }
});

class Status extends Component {
  constructor(props) {
    super(props)

    this.state = {
      statusJson: null,
      error: null,
      showDebugInfo: false
    };
  }

  componentDidMount() {
    getStatus(
      (result) => {
        this.formattedData = this.formatStatus(result);
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

  onSubmit = () => {
    getStatus(
      (result) => {
        this.formattedData = this.formatStatus(result);
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

  formatStatus(status) {
    const hourKeys = ['01HourAgoToNow', '02to01HourAgo', '03to02HoursAgo', '04to03HoursAgo', '05to04HoursAgo', '06to05HoursAgo',
      '07to06HoursAgo', '08to07HoursAgo', '09to08HoursAgo', '10to09HoursAgo', '11to10HoursAgo', '12to11HoursAgo',
      '13to12HoursAgo', '14to13HoursAgo', '15to14HoursAgo', '16to15HoursAgo', '17to16HoursAgo', '18to17HoursAgo',
      '19to18HoursAgo', '20to19HoursAgo', '21to20HoursAgo', '22to21HoursAgo', '23to22HoursAgo', '24to23HoursAgo'];
    const oneHour = 1000 * 60 * 60;
    let lastAnalysisDate = new Date(status.currentStats.lastAnalysisDate).valueOf();
    let hours = [...Array(24).keys()].map(x => {
      return {
        'name': new Date(lastAnalysisDate - (oneHour * x)).toLocaleString(),
        'loseFEC': status[hourKeys[x]].CMStatus16Count,
        'recoverFEC': status[hourKeys[x]].CMStatus24Count,
        't3': status[hourKeys[x]].T3TimeoutCount,
        't4': status[hourKeys[x]].T4TimeoutCount
      }
    });
    return hours;
  }

  render() {
    return (<div>
      <Button style={{ margin: '10px' }} variant="contained" color="primary" onClick={this.onSubmit}><RefreshIcon></RefreshIcon></Button>
      <ResponsiveContainer height={400}>
        <BarChart data={this.formattedData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="loseFEC" name="Loss of FEC" fill="#8884d8" />
          <Bar dataKey="recoverFEC" name="Regain FEC" fill="#82ca9d" />
          {/* <Bar dataKey="t3" name="T3 Timeout" fill="#cccc00" />
        <Bar dataKey="t4" name="T4 Timeout" fill="#ff3333" /> */}
        </BarChart>
      </ResponsiveContainer>
      <Typography>
        Last event collection &amp; analysis time: {(this.state.statusJson && new Date(this.state.statusJson.currentStats.lastAnalysisDate).toLocaleString()) || ''}<br />
        <br /><u>24 Hour totals:</u><br />
        Loss of FEC: {(this.state.statusJson && this.state.statusJson["24HoursAgoToNow"].CMStatus16Count) || 0}<br />
        Recovery of FEC: {(this.state.statusJson && this.state.statusJson["24HoursAgoToNow"].CMStatus24Count) || 0}<br />
        T3 Timeouts: {(this.state.statusJson && this.state.statusJson["24HoursAgoToNow"].T3TimeoutCount) || 0}<br />
        T4 Timeouts: {(this.state.statusJson && this.state.statusJson["24HoursAgoToNow"].T4TimeoutCount) || 0}
      </Typography>
      {this.state.showDebugInfo ? (
        <Paper style={{ display: false, overflowX: 'scroll', height: 256, width: 768, whiteSpace: "pre-line" }} elevation={3} >
          <ThemeProvider theme={theme}>
            <Typography variant="body2"> {
              JSON.stringify(this.state.statusJson, null, 2)
            } </Typography>
          </ThemeProvider>
        </Paper>
      ) : (<br />)}
    </div>)
  }
}

export default Status;