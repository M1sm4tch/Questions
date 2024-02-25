// pages/DeleteQuestion.js

import { useState } from 'react';
import { deleteQuestionById } from '../services/api'; // Import your API functions

const DeleteQuestion = () => {
  const [questionId, setQuestionId] = useState('');

  const handleDeleteQuestion = async () => {
    try {
      await deleteQuestionById(questionId);
      console.log('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Delete Question</h1>
      <div className="mb-4">
        <label className="block">Question ID:</label>
        <input
          type="text"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          className="border p-2"
        />
      </div>
      <button onClick={handleDeleteQuestion} className="bg-red-500 text-white px-4 py-2">
        Delete Question
      </button>
    </div>
  );
};

export default DeleteQuestion;
