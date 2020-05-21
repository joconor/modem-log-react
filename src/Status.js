import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

import { getStatus } from './api';

class Status extends Component {
  constructor(props) {
    super(props)

    this.state = {
      statusJson: null,
      error: null
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
        'uv': status[hourKeys[x]].CMStatus16Count,
        'pv': status[hourKeys[x]].CMStatus24Count
      }
    });
    return hours;
  }

  render() {
    return (<div>
      <Button style={{ margin: '10px' }} variant="contained" color="primary" onClick={this.onSubmit}>Refresh Statistics</Button>
      <BarChart width={800} height={300} data={this.formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" name="Loss of FEC" fill="#8884d8" />
        <Bar dataKey="uv" name="Regain FEC" fill="#82ca9d" />
      </BarChart>
      <Paper style={{ overflowX: 'scroll', height: 512, whiteSpace: "pre-line" }} elevation={3} >
        <Typography> {
          JSON.stringify(this.state.statusJson, null, 2)
        } </Typography>
      </Paper>
    </div>)
  }
}

export default Status;