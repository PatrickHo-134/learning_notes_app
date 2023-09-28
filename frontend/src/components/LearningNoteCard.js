import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import moment from "moment";
import {
  archiveLearningNote,
  deleteLearningNote,
} from "../actions/learningNoteActions";
import EditLearningNoteModal from "./EditLearningNoteModal";
import { AutoHeightQuill } from "./ReactQuill";

const LearningNoteCard = ({ learningNote }) => {
  const { user, created_at, title, content, updated_at } = learningNote;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleArchive = () => {
    dispatch(archiveLearningNote(learningNote.id, userInfo));
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteLearningNote(learningNote.id, userInfo));
    handleMenuClose();
  };

  const handleEdit = () => {
    setShowEditModal(true);
    handleMenuClose();
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: "1rem" }} gutterBottom>
      <CardContent>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <div>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
                color="text.primary"
                gutterBottom
              >
                {title}
              </Typography>

              <Typography
                variant="caption"
                component="pre"
                style={{ whiteSpace: "pre-line" }}
                gutterBottom
              >
                Date Created:{" "}
                {moment(created_at).format("MMMM Do YYYY, h:mm a")}
              </Typography>

              {updated_at && (
                <Typography
                  variant="caption"
                  component="pre"
                  style={{ whiteSpace: "pre-line" }}
                  gutterBottom
                >
                  Date Updated:{" "}
                  {moment(updated_at).format("MMMM Do YYYY, h:mm a")}
                </Typography>
              )}
            </div>
          }
          sx={{ padding: "0" }}
        />

        <AutoHeightQuill content={content} />
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleArchive}>Archive</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      {showEditModal && (
        <EditLearningNoteModal
          learningNote={learningNote}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </Card>
  );
};

export default LearningNoteCard;
