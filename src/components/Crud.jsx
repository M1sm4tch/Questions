// App.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Change this to your API endpoint

const Crud = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    category: '',
    options: [],
    correct_option_id: '',
  });

  useEffect(() => {
    // Fetch all questions on component mount
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/questions`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index].option_text = e.target.value;
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };

  const handleAddOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { option_text: '' }],
    });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions.splice(index, 1);
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };

  const handleCreateQuestion = async () => {
    try {
      await axios.post(`${API_URL}/addquestion`, newQuestion);
      setNewQuestion({
        question_text: '',
        category: '',
        options: [],
        correct_option_id: '',
      });
      fetchQuestions(); // Refresh the list after creating a new question
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(`${API_URL}/question/delete/${id}`);
      fetchQuestions(); // Refresh the list after deleting a question
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div>
      <h1>Questions App</h1>

      {/* Create Question */}
      <div>
        <h2>Create Question</h2>
        <label>
          Question Text:
          <input
            type="text"
            name="question_text"
            value={newQuestion.question_text}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newQuestion.category}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Options:
          {newQuestion.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option.option_text}
                onChange={(e) => handleOptionChange(index, e)}
              />
              <button type="button" onClick={() => handleRemoveOption(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </label>
        <br />
        <label>
          Correct Option ID:
          <input
            type="text"
            name="correct_option_id"
            value={newQuestion.correct_option_id}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateQuestion}>
          Create Question
        </button>
      </div>

      {/* List Questions */}
      <div>
        <h2>Questions</h2>
        <ul>
          {questions.map((question) => (
            <li key={question._id}>
              {question.question_text} -{' '}
              <button onClick={() => handleDeleteQuestion(question._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Crud;
