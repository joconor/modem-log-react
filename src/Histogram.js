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
    const emptyHistogram = [
      { label: "12mi", value: 0 }, { label: "1a", value: 0 }, { label: "2a", value: 0 }, { label: "3a", value: 0 },
      { label: "4a", value: 0 }, { label: "5a", value: 0 }, { label: "6a", value: 0 }, { label: "7a", value: 0 },
      { label: "8a", value: 0 }, { label: "9a", value: 0 }, { label: "10a", value: 0 }, { label: "11a", value: 0 },
      { label: "12n", value: 0 }, { label: "1p", value: 0 }, { label: "2p", value: 0 }, { label: "3p", value: 0 },
      { label: "4p", value: 0 }, { label: "5p", value: 0 }, { label: "6p", value: 0 }, { label: "7p", value: 0 },
      { label: "8p", value: 0 }, { label: "9p", value: 0 }, { label: "10p", value: 0 }, { label: "11p", value: 0 },
    ];
    // return Object.keys(histogram).sort().map(x => {
      return [...Array(24).keys()].map(x => {
      return {
        // Display the histogram starting at midnight --local-- time.
        // To do this, access the histogram bins with the index adjusted by the timezone offset in hours.
        'name': emptyHistogram[x].label,
        'count': histogram === null ? emptyHistogram[x].value : histogram[((x + new Date().getTimezoneOffset() / 60 + 24) % 24).toString().padStart(2, "0")]
      }
    })
  }
  render() {
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