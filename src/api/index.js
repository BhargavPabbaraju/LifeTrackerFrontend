import axios from "axios";

export const API_ENDPOINTS = {
  DOMAINS: "domains/",
  TAGS: "tags/",
  GOAL_TYPES: "goal-types/",
};

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", //Django backend url
});

export default api;
