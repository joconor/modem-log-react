import React, { Component } from 'react';
import { isYesterday, format } from 'date-fns'

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
    const hourKeys = ['currentHour', 'minus01Hour', 'minus02Hours', 'minus03Hours', 'minus04Hours', 'minus05Hours',
      'minus06Hours', 'minus07Hours', 'minus08Hours', 'minus09Hours', 'minus10Hours', 'minus11Hours',
      'minus12Hours', 'minus13Hours', 'minus14Hours', 'minus15Hours', 'minus16Hours', 'minus17Hours',
      'minus18Hours', 'minus19Hours', 'minus20Hours', 'minus21Hours', 'minus22Hours', 'minus23Hours'];
    const oneHour = 1000 * 60 * 60;
    let lastAnalysisDate = new Date(status.currentStats.lastAnalysisDate).valueOf();
    let hours = [...Array(24).keys()].map(x => {
      let hoursAgo = new Date(lastAnalysisDate - (oneHour * x));
      return {
        'name': format(hoursAgo, 'hbbbbb'),
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
    const {hours, firstYesterday} = this.formatStatus(this.props.statusJson);
    return (<div>
      <ResponsiveContainer height={400}>
        <BarChart data={hours} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="loseFEC" name="FEC errors over limit" fill="#8884d8" />
          {/* <Bar dataKey="recoverFEC" name="FEC recovery on OFDM profile" fill="#82ca9d" /> */}
          <ReferenceArea x1={firstYesterday.name} />
        </BarChart>
      </ResponsiveContainer>
    </div>)
  }
}

export default Status;