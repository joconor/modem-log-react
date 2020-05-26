import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { startOfToday, formatRelative, isYesterday, format } from 'date-fns'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';

class Status extends Component {

  formatStatus(status) {
    const hourKeys = ['01HourAgoToNow', '02to01HourAgo', '03to02HoursAgo', '04to03HoursAgo', '05to04HoursAgo', '06to05HoursAgo',
      '07to06HoursAgo', '08to07HoursAgo', '09to08HoursAgo', '10to09HoursAgo', '11to10HoursAgo', '12to11HoursAgo',
      '13to12HoursAgo', '14to13HoursAgo', '15to14HoursAgo', '16to15HoursAgo', '17to16HoursAgo', '18to17HoursAgo',
      '19to18HoursAgo', '20to19HoursAgo', '21to20HoursAgo', '22to21HoursAgo', '23to22HoursAgo', '24to23HoursAgo'];
    const oneHour = 1000 * 60 * 60;
    let lastAnalysisDate = new Date(status.currentStats.lastAnalysisDate).valueOf();
    let hours = [...Array(24).keys()].map(x => {
      let hoursAgo = new Date(lastAnalysisDate - (oneHour * x));
      return {
        'name': format(hoursAgo, 'p'),
        'date': hoursAgo,
        'loseFEC': status[hourKeys[x]].CMStatus16Count,
        'recoverFEC': status[hourKeys[x]].CMStatus24Count,
        't3': status[hourKeys[x]].T3TimeoutCount,
        't4': status[hourKeys[x]].T4TimeoutCount
      }
    });
    let firstYesterday = hours.find(x => {
      return isYesterday(x.date);
    });
    return {
      'hours': hours,
      'firstYesterday': firstYesterday
    }
  }

  render() {
    if(!this.props.statusJson) {
      return null;
    }
    const {hours: formattedData, firstYesterday} = this.formatStatus(this.props.statusJson);
    return (<div>
      <ResponsiveContainer height={400}>
        <BarChart data={formattedData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="loseFEC" name="Loss of FEC" fill="#8884d8" />
          <Bar dataKey="recoverFEC" name="Regain FEC" fill="#82ca9d" />
          <ReferenceArea x1={firstYesterday.name} />
        </BarChart>
      </ResponsiveContainer>
      <Typography>
        Last event collection &amp; analysis time {' was '.concat(formatRelative(new Date(this.props.statusJson.currentStats.lastAnalysisDate), startOfToday()))}<br />
        <br /><u>24 Hour totals:</u><br />
        Loss of FEC: {(this.props.statusJson["24HoursAgoToNow"].CMStatus16Count) || 0}<br />
        Recovery of FEC: {(this.props.statusJson["24HoursAgoToNow"].CMStatus24Count) || 0}<br />
        T3 Timeouts: {(this.props.statusJson["24HoursAgoToNow"].T3TimeoutCount) || 0}<br />
        T4 Timeouts: {(this.props.statusJson["24HoursAgoToNow"].T4TimeoutCount) || 0}
      </Typography>
    </div>)
  }
}

export default Status;