import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Directly specify your backend URL here
  headers: {
    "Content-Type": "application/json", // default headers for JSON requests
    Accept: "application/json", // expect JSON responses
  },
});

export default instance;
