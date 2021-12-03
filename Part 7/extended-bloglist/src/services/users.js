import axios from "axios";

const baseUrl = "/api/users";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const get = (id) => {
  const url = baseUrl + "/" + id;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default { getAll, get };
