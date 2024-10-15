import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios, { AxiosError } from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DialogueData, SaveDeviceResponse } from "../@types/dialogue.type";
import { TableRecord } from "../@types/table.type";
import { Typography } from "@mui/material";

function AddDeviceDialogue({ onClose }: DialogueData) {
  const initialData: TableRecord = {
    name: "",
    serialNumber: 0,
    creationDate: "",
  };
  const [open, setOpen] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [formData, setFormData] = useState<TableRecord>(initialData);
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "serialNumber" ? parseInt(value, 10) : value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingData(true);
    setError("");
    try {
      const response = await axios.post<SaveDeviceResponse>(
        "http://localhost:3005/api/devices/saveDevice",
        formData
      );
      onClose(response.data.device);
      resetDialogue();
    } catch (error: unknown) {
      console.error(error);
      setSavingData(false);
      const generalMessage = "Couldn't save device. Please try again";
      if (error instanceof AxiosError) {
        setError(
          error.status === 400 ? "Serial number already exists" : generalMessage
        );
      } else {
        setError(generalMessage);
      }
    }
  };

  const resetDialogue = () => {
    setOpen(false);
    setFormData(initialData);
    setSavingData(false);
    setError("");
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Device
      </Button>
      <Dialog
        closeAfterTransition={true}
        open={open}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          resetDialogue();
        }}
        PaperProps={{
          component: "form",
          onSubmit: onFormSubmit,
        }}
      >
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent>
          <DialogContentText>Input device info please</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Device Name"
            type="text"
            fullWidth
            variant="standard"
            disabled={savingData}
            value={formData.name}
            onChange={handleInputChange} // Handle changes to name input
          />
          <TextField
            disabled={savingData}
            required
            margin="dense"
            id="serial-number"
            name="serialNumber"
            label="Serial Number"
            type="number"
            slotProps={{ input: { minRows: 0 } }}
            fullWidth
            variant="standard"
            value={formData.serialNumber}
            onChange={handleInputChange} // Handle changes to serial number input
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={savingData}
            variant="contained"
            onClick={() => resetDialogue()}
          >
            Cancel
          </Button>
          <Button disabled={savingData} variant="contained" type="submit">
            {savingData ? "Loading..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddDeviceDialogue;
