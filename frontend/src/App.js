import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import LandingPage from "./components/LandingPage";
import LearningNoteList from "./components/LearningNoteList";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/timeline/:userId" element={<LearningNoteList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
