import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import {
  archiveLearningNote,
  deleteLearningNote,
  addLabelToLearningNote,
  removeLabelFromLearningNote,
} from "../actions/learningNoteActions";
import EditLearningNoteModal from "./EditLearningNoteModal";
import LabelSelectPopover from "./LabelSelectPopover";
import LearningNoteLabel from "./LearningNoteLabel";
import { AutoHeightQuill } from "./ReactQuill";

const LearningNoteCard = ({ learningNote }) => {
  const { id, created_at, title, content, updated_at, labels } = learningNote;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false); // Set to false to collapse by default
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [labelPopoverAnchorEl, setLabelPopoverAnchorEl] = useState(null);
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

  const handleLabelPopoverOpen = (event) => {
    setLabelPopoverAnchorEl(event.currentTarget);
  };

  const handleLabelPopoverClose = () => {
    setLabelPopoverAnchorEl(null);
  };

  const handleAddLabel = (labelId) => {
    dispatch(addLabelToLearningNote(id, labelId));
    handleLabelPopoverClose();
  };

  const handleRemoveLabel = (labelId) => {
    dispatch(removeLabelFromLearningNote(id, labelId));
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {labels && labelList ? (
            labels.map((labelId) => (
              <LearningNoteLabel
                key={labelId}
                labelId={labelId}
                labelList={labelList}
                onRemoveLabel={handleRemoveLabel}
              />
            ))
          ) : (
            <div></div>
          )}
          <IconButton onClick={handleLabelPopoverOpen}>
            <AddIcon />
          </IconButton>
        </Box>
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

      <LabelSelectPopover
        anchorEl={labelPopoverAnchorEl}
        open={Boolean(labelPopoverAnchorEl)}
        onClose={handleLabelPopoverClose}
        onLabelSelect={handleAddLabel}
        currentLabelIds={labels}
      />
    </Card>
  );
};

export default LearningNoteCard;
