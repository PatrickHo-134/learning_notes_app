import React, { useState } from "react";
import { Chip } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

function MainLabel({ labelInfo, onRemoveLabel }) {
  const [hovered, setHovered] = useState(false);
  const { id, name, color } = labelInfo;

  return (
    <Chip
      key={id}
      label={name}
      style={{ backgroundColor: color, minWidth: "7rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      deleteIcon={hovered ? <CloseIcon /> : <div></div>}
      onDelete={() => onRemoveLabel(id)}
    />
  );
}

export default MainLabel;
