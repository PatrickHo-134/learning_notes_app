import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabels, deleteLabel } from "../actions/labelActions";
import { CircularProgress, Box } from "@mui/material";
import LabelForm from "./LabelForm";
import MainLabel from "./MainLabel";

const LabelList = () => {
  const dispatch = useDispatch();

  const labelList = useSelector((state) => state.labelList);
  const { loading, error, labels } = labelList;

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  const handleRemoveLabel = (labelId) => {
    dispatch(deleteLabel(labelId));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        marginBottom: "1rem",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <span>{error}</span>
      ) : (
        labels.map((label) => (
          <MainLabel
            key={label.id}
            labelInfo={label}
            onRemoveLabel={handleRemoveLabel}
          />
        ))
      )}
      <LabelForm />
    </Box>
  );
};

export default LabelList;
