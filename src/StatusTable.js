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

function createData(index, time, priority, description) {
  return { index, time, priority, description };
}

const rows = [
  createData(0, '2020-05-26, 09:00:33', 'Notice (6)', 'CM-STATUS message sent. Event Type Code: 24; Chan ID: 33 ; DSID: N/A; MAC Addr: N/A; OFDM/OFDMA Profile ID: 1 2 3 .;CM-MAC=3c:37:86:e8:47:20;CMTS-MAC=00:17:10:8d:ef:a4;CM-QOS=1.1;CM-VER=3.1;'),
  createData(1, '2020-05-26, 09:00:24', 'Notice (6)', 'CM-STATUS message sent. Event Type Code: 16; Chan ID: 33 ; DSID: N/A; MAC Addr: N/A; OFDM/OFDMA Profile ID: 3 .;CM-MAC=3c:37:86:e8:47:20;CMTS-MAC=00:17:10:8d:ef:a4;CM-QOS=1.1;CM-VER=3.1;'),
  createData(2, '2020-05-26, 04:24:51', 'Error (4)', 'DHCP RENEW WARNING - Field invalid in response v4 option;CM-MAC=3c:37:86:e8:47:20;CMTS-MAC=00:17:10:8d:ef:a4;CM-QOS=1.1;CM-VER=3.1;'),
  createData(3, '2020-05-26, 04:20:37', 'Notice (6)', 'CM-STATUS message sent. Event Type Code: 24; Chan ID: 33 ; DSID: N/A; MAC Addr: N/A; OFDM/OFDMA Profile ID: 1 2 3 .;CM-MAC=3c:37:86:e8:47:20;CMTS-MAC=00:17:10:8d:ef:a4;CM-QOS=1.1;CM-VER=3.1;'),
  createData(4, '2020-05-26, 04:20:25', 'Notice (6)', 'CM-STATUS message sent. Event Type Code: 16; Chan ID: 33 ; DSID: N/A; MAC Addr: N/A; OFDM/OFDMA Profile ID: 3 .;CM-MAC=3c:37:86:e8:47:20;CMTS-MAC=00:17:10:8d:ef:a4;CM-QOS=1.1;CM-VER=3.1;'),
];

export default function DenseTable() {
  const classes = useStyles();

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
              <TableCell style={{ width: "75%", padding: "6px", fontSize: "9pt" }}>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
