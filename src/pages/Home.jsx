import  { useEffect, useState } from 'react';
import { getAllQuestions, isAuthenticated } from '../services/api';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await getAllQuestions();
        setQuestions(questionsData);
        setLoading(false);
      } catch (error) {
        if (!isAuthenticated()) {
          setError('User not logged in.')
          setLoading(false) 
        } else {
          console.error('Error fetching questions:', error);
          setError('Error fetching questions. Please try again later.');
          setLoading(false);
        } 
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">All Questions</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="list-disc pl-6">
          {questions.length === 0 ? (
            <p className="text-gray-600">No questions available.</p>
          ) : (
            questions.map((question) => (
              <li key={question._id} className="mb-4">
                <strong className="text-xl">{question.question_text}</strong>
                <p className="text-gray-600">Category: {question.category}</p>
                <p className="text-gray-700">Options:</p>
                <ul className="list-disc pl-8">
                  {question.options.map((option) => (
                    <li key={option._id} className="text-gray-600">
                      {option.option_text}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
