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

// An Array of Arrays
// First element in each array is a regex to match against.
// Second element in the array are the object property keys to
// use to extract the useful parts of an event description from
// event.descriptionArray if we match against the first element regex
const messageDescriptionArray = [
  [/^CM-STATUS message sent\. Event Type Code: (?:16|24).*/, ['01','02','05']],
  [/^CM-STATUS message sent\. Event Type Code: (?:20|22).*/, ['01','02']],
  [/^Honoring MDD.*/, ['01','02']],
  [/^DS profile assignment change\..*/, ['01','02','03']]
];

// Using first item in event description object, match against the regex in messageDescriptionArray
// If no match, default to first item in event description object as the entire event description
// If a regex match is found, then assemble a full event description from the appropriate elements
// of the event description object.
function matchFromArray(event) {
  let foundIndex = messageDescriptionArray.findIndex(element => event.descriptionArray['01'].match(element[0]));
  if(foundIndex === -1) {
    return event.descriptionArray['01'];
  } else {
    let descriptionStrings = [];
    messageDescriptionArray[foundIndex][1].forEach(element => descriptionStrings.push(event.descriptionArray[element]));
    return descriptionStrings.join('; ');
  };
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
              <TableCell style={{ WebkitTextSizeAdjust: "100%", width: "75%", padding: "6px", fontSize: "9pt" }}>{matchFromArray(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
