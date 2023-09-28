import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container
} from "@mui/material";
import { fetchLearningNotes, createLearningNote } from '../actions/learningNoteActions';
import LearningNoteCard from './LearningNoteCard';
import AddLearningNoteModal from './AddLearningNoteModal';

const LearningNoteList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const learningNotes = useSelector((state) => state.learningNotes.learningNotes);
  const userInfoFromState = useSelector((state) => state.userLogin.userInfo);
  const userInfoFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
  // FIXME: fix issue with persisting data in Redux state so we can get it from state instead of localstorage
  const userInfo = userInfoFromLocalStorage;

  useEffect(() => {
    if (userInfo){
      dispatch(fetchLearningNotes(userInfo));
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
