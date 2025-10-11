// // import axios from "axios";

// // const axiosInstance = axios.create({
// // 	baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
// // 	withCredentials: true, // send cookies to the server
// // });

// // export default axiosInstance;
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,   // We'll set this in .env file
//   withCredentials: true,
// });

// export default instance;

import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://questify-backend-wt1s.onrender.com/api',
  withCredentials: true,
});

export default instance;
