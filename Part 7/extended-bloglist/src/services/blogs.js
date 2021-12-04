import axios from "axios";
import storage from "../utils/storage";

const baseUrl = "/api/blogs";

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, getConfig());
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return response.data;
};

const comment = async (id, cmt) => {
  const url = baseUrl + "/" + id + "/comments";
  const response = await axios.post(url, cmt, getConfig());

  return response.data;
};
const blogService = { getAll, create, update, remove, comment };
export default blogService;
