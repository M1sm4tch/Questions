import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace with your actual server URL

// Get the user token from wherever you store it (e.g., localStorage, sessionStorage)
const userToken = localStorage.getItem('userToken');

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${userToken}`, // Include the user's token in the Authorization header
  },
});

export const getAllQuestions = async () => {
  return axiosInstance.get('/questions').then(response => response.data);
};

export const addQuestion = async (questionData) => {
  return axiosInstance.post('/addquestion', questionData).then(response => response.data);
};

export const getQuestionById = async (questionId) => {
  return axiosInstance.get(`/question/${questionId}`).then(response => response.data);
};

export const updateQuestionById = async (questionId, updatedQuestionData) => {
  return axiosInstance.put(`/question/update/${questionId}`, updatedQuestionData).then(response => response.data);
};

export const deleteQuestionById = async (questionId) => {
  return axiosInstance.delete(`/question/delete/${questionId}`).then(response => response.data);
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:3000/user/login', credentials);
    
    // Store the token securely (e.g., localStorage)
    localStorage.setItem('userToken', response.data.token);

    // Redirect or perform other actions as needed
  } catch (error) {
    console.error('Error logging in:', error.message);
    // Handle login failure
  }
};

export const isAuthenticated = () => {
    const userToken = localStorage.getItem('userToken');
    console.log(userToken)
    return !!userToken;
  }

export const logoutUser = async () => {
  try {
    localStorage.removeItem('userToken');
    console.log('logged out')
    return
  }
  catch (error) {
    console.log(error);
  }
}