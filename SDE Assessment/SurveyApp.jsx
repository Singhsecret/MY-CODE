//Create React App: Set up a new React.js project using create-react-app.

import React, { useState } from 'react';
import './SurveyApp.css'; // Import CSS file for styling

const SurveyApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const questions = [
    "How satisfied are you with our products?",
    "How fair are the prices compared to similar retailers?",
    "How satisfied are you with the value for money of your purchase?",
    "On a scale of 1-10 how would you recommend us to your friends and family?",
    "What could we do to improve our service?"
  ];

  const handleNext = () => {
    setCurrentQuestion(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      handleNext();
    } else {
      setCompleted(true);
    }
  };

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
    if (currentQuestion < questions.length - 1) {
      handleNext();
    } else {
      setCompleted(true);
    }
  };

  const handleSubmit = () => {
    // Logic to submit survey data (save to database or local storage)
    setCompleted(true);
  };

  const renderQuestion = () => {
    return (
      <div className="question-container">
        <p className="question">{questions[currentQuestion]}</p>
        {currentQuestion !== 3 ? ( // Rating type questions
          <div className="rating-options">
            {[...Array(5)].map((_, index) => (
              <button key={index} onClick={() => handleAnswer(index + 1)}>{index + 1}</button>
            ))}
          </div>
        ) : ( // Special case for question 4
          <div className="rating-options">
            {[...Array(10)].map((_, index) => (
              <button key={index} onClick={() => handleAnswer(index + 1)}>{index + 1}</button>
            ))}
          </div>
        )}
        {currentQuestion !== 4 && (
          <button className="skip-button" onClick={handleSkip}>Skip</button>
        )}
      </div>
    );
  };

  return (
    <div className="survey-app">
      {!completed ? (
        <div>
          <h1 className="welcome-text">Welcome to Our Survey!</h1>
          <button className="start-button" onClick={() => setCurrentQuestion(0)}>Start</button>
          <p className="question-counter">Question {currentQuestion + 1}/{questions.length}</p>
          {renderQuestion()}
        </div>
      ) : (
        <div>
          <h1 className="thank-you-text">Thank You for Completing the Survey!</h1>
          <button className="restart-button" onClick={() => setCompleted(false)}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default SurveyApp;

