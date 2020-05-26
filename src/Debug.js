import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';


class Debug extends Component {


  render() {
    return (<div>
      <Paper style={{ display: false, overflowX: 'scroll', height: 256, width: 768 }} elevation={3} >
        <pre>{JSON.stringify(this.props.debugInfo, null, 2)}</pre>
      </Paper>
    </div>)
  }

}

export default Debug;