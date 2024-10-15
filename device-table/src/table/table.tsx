import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import {
  columns,
  TableRecord,
  TableRecordResponse,
} from "../@types/table.type";
import { useEffect, useState } from "react";
import AddDeviceDialogue from "../dialogue/dialogue";
import axios from "axios";

function DeviceTable() {
  const [loadingData, setLoadingData] = useState(true);
  const [rows, setRows] = useState<TableRecord[]>([]);

  const getTableData = async () => {
    try {
      const response = await axios.get<TableRecordResponse>(
        "http://localhost:3005/api/devices/getDevices"
      );
      setRows(response.data.devices);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  const onDialogueClose = (record: TableRecord) => {
    setRows([...rows, record]);
  };

  return (
    <>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.serialNumber}</TableCell>
                  <TableCell align="left">{row.creationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <AddDeviceDialogue onClose={onDialogueClose} />
    </>
  );
}

export default DeviceTable;
