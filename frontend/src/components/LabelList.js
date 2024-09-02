import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabels } from "../actions/labelActions";
import { CircularProgress, Chip, Box } from "@mui/material";
import LabelForm from "./LabelComponent";

const LabelList = () => {
  const dispatch = useDispatch();

  const labelList = useSelector((state) => state.labelList);
  const { loading, error, labels } = labelList;

  useEffect(() => {
    dispatch(fetchLabels());
  }, [dispatch]);

  return (
    <div>
      <Box
        sx={{
          marginTop: "1rem",
          marginBottom: "1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
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
      </Box>
    </div>
  );
};

export default LabelList;
