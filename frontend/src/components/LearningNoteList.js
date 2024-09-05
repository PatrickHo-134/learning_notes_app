import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container
} from "@mui/material";
import { fetchLearningNotes, createLearningNote } from '../actions/learningNoteActions';
import LearningNoteCard from './LearningNoteCard';
import AddLearningNoteModal from './AddLearningNoteModal';
import LabelList from './LabelList';
import { fetchLabels } from '../actions/labelActions';

const LearningNoteList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const learningNotes = useSelector((state) => state.learningNotes.learningNotes);
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  useEffect(() => {
    if (userInfo){
      dispatch(fetchLearningNotes(userInfo))
      dispatch(fetchLabels(userInfo));
    } else {
      navigate("/");
    }
  }, []);

  const handleAddNote = (newNote) => {
    dispatch(createLearningNote(newNote));
  };

  return (
    <Container maxWidth="md">
      <h1>Timeline</h1>
      <LabelList />
      <AddLearningNoteModal onAddNote={handleAddNote} />
      {learningNotes.length === 0 ? (
        <p>Your Timeline is empty. Let's create your first note.</p>
      ) : (
        learningNotes.map((note) => <LearningNoteCard key={note.id} learningNote={note} />)
      )}
    </Container>
  );
};

export default LearningNoteList;
