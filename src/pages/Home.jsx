// Home.jsx

import  { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch all questions from the API
    axios.get('http://localhost:3000/api/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 ">All Questions</h2>
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions available.</p>
      ) : (
        <ul className="list-disc pl-6">
          {questions.map(question => (
            <li key={question._id} className="mb-4">
              <strong className="text-xl">{question.question_text}</strong>
              <p className="text-gray-600">Category: {question.category}</p>
              <p className="text-gray-700">Options:</p>
              <ul className="list-disc pl-8">
                {question.options.map(option => (
                  <li key={option._id} className="text-gray-600">{option.option_text}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
