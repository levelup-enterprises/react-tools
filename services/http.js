/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
// Root url
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Handle 400 & 500 errors
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error(error);
  }

  return Promise.reject(error);
});

// Set X Auth in outbound headers
function setJwt(jwt) {
  axios.defaults.headers.common["X-Auth-Token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
