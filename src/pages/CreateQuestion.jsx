// pages/CreateQuestion.js

import { useState } from 'react';
import { addQuestion } from '../services/api';

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionId, setCorrectOptionId] = useState('');

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleCreateQuestion = async () => {
    try {
      const newQuestionData = {
        question_text: questionText,
        category: category,
        options: options.map((option_text, index) => ({
          option_id: index + 1, // Assuming options have unique IDs
          option_text,
        })),
        correct_option_id: parseInt(correctOptionId), // Convert to integer
        // Add other fields if necessary
      };

      const response = await addQuestion(newQuestionData);
      console.log('Question created:', response);

      // Clear form fields after successful creation
      setQuestionText('');
      setCategory('');
      setOptions(['', '', '', '']);
      setCorrectOptionId('');
    } catch (error) {
      console.error('Error creating question:', error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Question</h2>
      <label className="block mb-2">
        Question Text:
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <label className="block mb-2">
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <label className="block mb-2">
        Options:
        <ul>
          {options.map((option, index) => (
            <li key={index} className="mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className="border p-2 w-full"
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={handleAddOption}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Option
        </button>
      </label>
      <label className="block mb-2">
        Correct Option ID:
        <input
          type="text"
          value={correctOptionId}
          onChange={(e) => setCorrectOptionId(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <button
        type="button"
        onClick={handleCreateQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Create Question
      </button>
    </div>
  );
};

export default CreateQuestion;
