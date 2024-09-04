import React, { useState } from "react";
import { Chip } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

function LearningNoteLabel({ labelId, labelList = [], onRemoveLabel }) {
  const [hovered, setHovered] = useState(false);

  if (!Array.isArray(labelList)) {
    console.error("labelList is not an array:", labelList);
    return null;
  }

  const labelInfo = labelList.find((x) => x.id === labelId);

  if (!labelInfo || !labelInfo.name) {
    return null;
  } else {
    return (
      <Chip
        key={labelInfo.id}
        label={labelInfo.name}
        style={{
          backgroundColor: labelInfo.color,
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        deleteIcon={hovered ? <CloseIcon /> : <div></div>}
        onDelete={() => onRemoveLabel(labelId)}
      />
    );
  }
}

export default LearningNoteLabel;
