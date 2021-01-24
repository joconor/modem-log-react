import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tablecell: {
    fontSize: '9pt'
  },
});

function descriptionForCmStatus16Event(event) {
  var items = [];
  items.push(event.descriptionArray['01']);
  items.push(event.descriptionArray['02']);
  items.push(event.descriptionArray['05']);
  return items.join('; ');
};

function descriptionForCmStatus24Event(event) {
  var items = [];
  items.push(event.descriptionArray['01']);
  items.push(event.descriptionArray['02']);
  items.push(event.descriptionArray['05']);
  return items.join('; ');
};

const messageDescriptions = {
  "CM-STATUS message sent. Event Type Code: 16": descriptionForCmStatus16Event,
  "CM-STATUS message sent. Event Type Code: 24": descriptionForCmStatus24Event,
};

function descriptionForEvent(event) {
  if(messageDescriptions[event.descriptionArray['01']]){
    return (messageDescriptions[event.descriptionArray['01']](event));
  } else {
    return event.description;
  }
};

export default function DenseTable(props) {
  const classes = useStyles();

  if(!props.events){
    return null;
  };
  let rows = [...props.events].reverse().map((event, index) => {
    let localTime = new Date(event.time).toLocaleString();
    return {index, ...event, localTime};
  });
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "15%", padding: "6px", fontSize: "9pt" }}>Time</TableCell>
            <TableCell style={{ width: "10%", padding: "6px", fontSize: "9pt" }}>Priority</TableCell>
            <TableCell style={{ width: "75%", padding: "6px", fontSize: "9pt" }}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.index}>
              <TableCell style={{ width: "15%", padding: "6px", fontSize: "9pt" }} component="th" scope="row">
                {row.localTime}
              </TableCell>
              <TableCell style={{ width: "10%", padding: "6px", fontSize: "9pt" }}>{row.priority}</TableCell>
              <TableCell style={{ WebkitTextSizeAdjust: "100%", width: "75%", padding: "6px", fontSize: "9pt" }}>{descriptionForEvent(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
