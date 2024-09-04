import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popover, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createLabel } from "../actions/labelActions";

const LabelForm = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("#b3cde0");
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const handleAddLabelClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLabelNameChange = (event) => {
    setNewLabelName(event.target.value);
  };

  const handleLabelColorChange = (event) => {
    setNewLabelColor(event.target.value);
  };

  const handleCreateLabel = () => {
    dispatch(createLabel({ name: newLabelName, color: newLabelColor, created_by: userInfo.id }, userInfo));

    setNewLabelName("");
    setNewLabelColor("#b3cde0");
    handlePopoverClose();
  };

  return (
    <div>
      <IconButton onClick={handleAddLabelClick}>
        <AddIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "1rem" }}>
          <TextField
            label="Label Name"
            value={newLabelName}
            placeholder="New Label"
            onChange={handleLabelNameChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Color"
            type="color"
            value={newLabelColor}
            onChange={handleLabelColorChange}
            fullWidth
            margin="dense"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateLabel}
            style={{ marginTop: "1rem" }}
          >
            Create Label
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default LabelForm;
