import React, { Component } from 'react';
import { isToday, isYesterday, format } from 'date-fns'

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
    const newToOldKeys = [
      { key: 'currentHour', offset: 0 }, { key: 'minus01Hour', offset: 1 }, { key: 'minus02Hours', offset: 2 },
      { key: 'minus03Hours', offset: 3 }, { key: 'minus04Hours', offset: 4 }, { key: 'minus05Hours', offset: 5 },
      { key: 'minus06Hours', offset: 6 }, { key: 'minus07Hours', offset: 7 }, { key: 'minus08Hours', offset: 8 },
      { key: 'minus09Hours', offset: 9 }, { key: 'minus10Hours', offset: 10 }, { key: 'minus11Hours', offset: 11 },
      { key: 'minus12Hours', offset: 12 }, { key: 'minus13Hours', offset: 13 }, { key: 'minus14Hours', offset: 14 },
      { key: 'minus15Hours', offset: 15 }, { key: 'minus16Hours', offset: 16 }, { key: 'minus17Hours', offset: 17 },
      { key: 'minus18Hours', offset: 18 }, { key: 'minus19Hours', offset: 19 }, { key: 'minus20Hours', offset: 20 },
      { key: 'minus21Hours', offset: 21 }, { key: 'minus22Hours', offset: 22 }, { key: 'minus23Hours', offset: 23 }
    ];
    const oldToNewKeys = [...newToOldKeys].reverse();
    const oneHour = 1000 * 60 * 60;
    let lastAnalysisDate = new Date(status.currentStats.lastAnalysisDate).valueOf();
    let hours = [...Array(24).keys()].map(x => {
      let key = this.props.newToOld ? newToOldKeys[x] : oldToNewKeys[x];
      let hoursAgo = new Date(lastAnalysisDate - (key.offset * oneHour));
      return {
        'name': format(hoursAgo, 'hbbbbb'),
        'date': hoursAgo,
        'loseFEC': status[key.key].CMStatus16Count,
        'recoverFEC': status[key.key].CMStatus24Count,
        't3': status[key.key].T3TimeoutCount,
        't4': status[key.key].T4TimeoutCount
      }
    });
    let dayBoundary = this.props.newToOld ? (hours.find(x => { return isYesterday(x.date);})) : hours.find(x => { return isToday(x.date);});
    return {
      'hours': hours,
      'dayBoundary': dayBoundary
    }
  }

  render() {
    if (!this.props.statusJson) {
      return null;
    }
    const { hours, dayBoundary } = this.formatStatus(this.props.statusJson);
    return (<div>
      <ResponsiveContainer height={400}>
        <BarChart data={hours} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="loseFEC" name="FEC errors over limit" fill="#8884d8" />
          {this.props.newToOld ? <ReferenceArea x1={dayBoundary.name} /> : <ReferenceArea x2={dayBoundary.name} /> }
        </BarChart>
      </ResponsiveContainer>
    </div>)
  }
}

export default Status;