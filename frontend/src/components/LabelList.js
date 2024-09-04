import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabels } from "../actions/labelActions";
import { CircularProgress, Chip, Box } from "@mui/material";
import LabelForm from "./LabelForm";

const LabelList = () => {
  const dispatch = useDispatch();

  const labelList = useSelector((state) => state.labelList);
  const { loading, error, labels } = labelList;

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

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
          <Chip
            key={label.id}
            label={label.name}
            style={{ backgroundColor: label.color }}
          />
        ))
      )}
      <LabelForm />
    </Box>
  );
};

export default LabelList;
