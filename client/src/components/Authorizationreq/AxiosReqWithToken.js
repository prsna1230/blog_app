import axios from "axios";

function getAxiosWithTokenObj() {
  // GET TOKEN
  let token = localStorage.getItem("token");

  // add token to header of req object
  let apiURL = "http://localhost:3030";
  let axiosRequestWithToken = axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosRequestWithToken;
}

export default getAxiosWithTokenObj;
