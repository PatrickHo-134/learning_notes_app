import React from "react";
import { Popover, List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";

const LabelSelectPopover = ({
  anchorEl,
  open,
  onClose,
  onLabelSelect,
  currentLabelIds,
}) => {
  const allLabels = useSelector((state) => state.labelList.labels);
  const labelOptions = allLabels
    .filter((label) => !currentLabelIds.includes(label.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List>
        {labelOptions.map((label) => (
          <ListItem
            button
            key={label.id}
            onClick={() => onLabelSelect(label.id)}
          >
            <ListItemText primary={label.name} />
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default LabelSelectPopover;
