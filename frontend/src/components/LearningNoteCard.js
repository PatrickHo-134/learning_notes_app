import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import {
  archiveLearningNote,
  deleteLearningNote,
} from "../actions/learningNoteActions";
import EditLearningNoteModal from "./EditLearningNoteModal";
import { AutoHeightQuill } from "./ReactQuill";

function renderLabel(labelId, labelList) {
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
          marginRight: "0.5rem",
          marginBottom: "0.5rem",
        }}
      />
    );
  }
}

const LearningNoteCard = ({ learningNote }) => {
  const { user, created_at, title, content, updated_at, labels } = learningNote;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false); // Set to false to collapse by default
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const labelList = useSelector((state) => state.labelList.labels);
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

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handlePopoverClick = (event) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
  };

  const isPopoverOpen = Boolean(popoverAnchorEl);

  return (
    <Card variant="outlined" sx={{ marginBottom: "1rem" }}>
      <CardContent>
        <CardHeader
          action={
            <div>
              <IconButton aria-label="information" onClick={handlePopoverClick}>
                <InfoIcon />
              </IconButton>
              <IconButton aria-label="settings" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <IconButton
                onClick={toggleContentVisibility}
                aria-label="toggle content visibility"
              >
                {isContentVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </div>
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
            </div>
          }
          sx={{ padding: "0" }}
        />
        <div style={{ margin: "1rem 0" }}>
          {(labels.length > 0 && labelList) ? (
            labels.map((labelId) => renderLabel(labelId, labelList))
          ) : (
            <div></div> // Button to add labels here
          )}
        </div>
        {isContentVisible && <AutoHeightQuill content={content} />}
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

      <Popover
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClick}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus
      >
        <Box sx={{ padding: 1 }}>
          <Typography variant="caption">
            Created: {moment(created_at).format("MMMM Do YYYY, h:mm a")}
          </Typography>
          {updated_at && (
            <Typography variant="caption">
              <br />
              Updated: {moment(updated_at).format("MMMM Do YYYY, h:mm a")}
            </Typography>
          )}
        </Box>
      </Popover>

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
