import { useState, useEffect } from 'react';
import { getQuestionById } from '../services/api'; // Import your API functions

const GetQuestionById = () => {
  const [questionId, setQuestionId] = useState('');
  const [question, setQuestion] = useState(null);

  const handleGetQuestion = async () => {
    try {
      const response = await getQuestionById(questionId);
      setQuestion(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  useEffect(() => {
    const logQuestionState = () => {
      console.log('Question state:', question);
    };
  
    const timeoutId = setTimeout(logQuestionState, 500); // Add a delay of 500 milliseconds
  
    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
  }, [question]);
  

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Get Question by ID</h1>
      <div className="mb-4">
        <label className="block">Question ID:</label>
        <input
          type="text"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          className="border p-2"
        />
      </div>
      <button onClick={handleGetQuestion} className="bg-blue-500 text-white px-4 py-2">
        Get Question
      </button>

      {question && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Question Details</h2>
          <pre>{JSON.stringify(question, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GetQuestionById;
