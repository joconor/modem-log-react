import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

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

class Histogram extends Component{

  formatHistogram(histogram) {
    return Object.keys(histogram).sort().map(x => {
      return {
        'name': x,
        'count': histogram[x]
      }
    })
  }
  render() {
    if (!this.props.histogram) {
      return null;
    }
    const bins = this.formatHistogram(this.props.histogram);
    return (<div>
      <ResponsiveContainer height={400}>
        <BarChart data={bins} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="All FEC over limit events in this hour" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>)
  }
}

export default Histogram;