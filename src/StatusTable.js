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

export default function DenseTable(props) {
  const classes = useStyles();

  if(!props.events){
    return null;
  };
  let rows = props.events.map((event, index) => {
    return {index, ...event};
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
                {row.time}
              </TableCell>
              <TableCell style={{ width: "10%", padding: "6px", fontSize: "9pt" }}>{row.priority}</TableCell>
              <TableCell style={{ WebkitTextSizeAdjust: "100%", width: "75%", padding: "6px", fontSize: "9pt" }}>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
