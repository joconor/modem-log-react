import React, { Component } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

class Histogram extends Component {

  formatHistogram(histogram) {
    const xAxisLabels = ["12mi", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a",
      "12n", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"]
    return Object.keys(histogram).sort().map(x => {
      return {
        // Display the histogram starting at midnight --local-- time.
        // To do this, access the histogram bins with the index adjusted by the timezone offset in hours.
        'name': xAxisLabels[parseInt(x)],
        'count': histogram[((parseInt(x) + new Date().getTimezoneOffset() / 60 + 24) % 24).toString().padStart(2, "0")]
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
          <Bar dataKey="count" name="Hourly FEC over limit histogram" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>)
  }
}

export default Histogram;