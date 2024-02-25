// src/QuizApp.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the Express API
    axios.get('http://localhost:3000/api/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  return (
    <div>
      <h1>Quiz App</h1>
      <ul>
        {questions.map(question => (
          <li key={question.question_id}>
            <strong>{question.question_text}</strong>
            <ul>
              {question.options.map(option => (
                <li key={option.option_id}>{option.option_text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizApp;
