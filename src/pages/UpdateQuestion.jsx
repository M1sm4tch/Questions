// pages/UpdateQuestion.js

import { useState } from 'react';
import { getQuestionById, updateQuestionById } from '../services/api';

const UpdateQuestion = () => {
  const [questionId, setQuestionId] = useState('');
  const [questionDetails, setQuestionDetails] = useState(null);
  const [updatedQuestionText, setUpdatedQuestionText] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedOptions, setUpdatedOptions] = useState([]);
  const [updatedCorrectOptionId, setUpdatedCorrectOptionId] = useState('');

  const handleGetQuestion = async () => {
    try {
      const response = await getQuestionById(questionId);
      console.log('Question details:', response);

      setQuestionDetails(response);
      setUpdatedQuestionText(response.question_text);
      setUpdatedCategory(response.category);
      setUpdatedOptions(response.options.map((option) => option.option_text));
      setUpdatedCorrectOptionId(response.correct_option_id.toString());
    } catch (error) {
      console.error('Error fetching question details:', error.message);
    }
  };

  const handleUpdateQuestion = async () => {
    try {
      const updatedQuestionData = {
        question_text: updatedQuestionText,
        category: updatedCategory,
        options: updatedOptions.map((option_text, index) => ({
          option_id: index + 1, // Assuming options have unique IDs
          option_text,
        })),
        correct_option_id: parseInt(updatedCorrectOptionId), // Convert to integer
        // Add other fields if necessary
      };

      const response = await updateQuestionById(questionId, updatedQuestionData);
      console.log('Question updated:', response);

      // Clear form fields after successful update
      setQuestionId('');
      setQuestionDetails(null);
      setUpdatedQuestionText('');
      setUpdatedCategory('');
      setUpdatedOptions([]);
      setUpdatedCorrectOptionId('');
    } catch (error) {
      console.error('Error updating question:', error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Question</h2>
      <label className="block mb-2">
        Question ID:
        <input
          type="text"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      <button
        onClick={handleGetQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Get Question Details
      </button>

      {questionDetails && (
        <div className="mt-4">
          <label className="block mb-2">
            Updated Question Text:
            <input
              type="text"
              value={updatedQuestionText}
              onChange={(e) => setUpdatedQuestionText(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Updated Category:
            <input
              type="text"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Updated Options:
            <ul>
              {updatedOptions.map((option, index) => (
                <li key={index} className="mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...updatedOptions];
                      newOptions[index] = e.target.value;
                      setUpdatedOptions(newOptions);
                    }}
                    className="border p-2"
                  />
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setUpdatedOptions([...updatedOptions, ''])}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add Option
            </button>
          </label>
          <label className="block mb-2">
            Updated Correct Answer ID:
            <input
              type="text"
              value={updatedCorrectOptionId}
              onChange={(e) => setUpdatedCorrectOptionId(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <button
            type="button"
            onClick={handleUpdateQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update Question
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateQuestion;
