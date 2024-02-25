// services/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace with your actual server URL

export const getAllQuestions = async () => {
  return axios.get(`${BASE_URL}/questions`).then(response => response.data);
};

export const addQuestion = async (questionData) => {
  return axios.post(`${BASE_URL}/addquestion`, questionData).then(response => response.data);
};

export const getQuestionById = async (questionId) => {
  return axios.get(`${BASE_URL}/question/${questionId}`).then(response => response.data);
};

export const updateQuestionById = async (questionId, updatedQuestionData) => {
  return axios.put(`${BASE_URL}/question/update/${questionId}`, updatedQuestionData).then(response => response.data);
};

export const deleteQuestionById = async (questionId) => {
  return axios.delete(`${BASE_URL}/question/delete/${questionId}`).then(response => response.data);
};
