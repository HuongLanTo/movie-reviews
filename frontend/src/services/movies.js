import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

class MovieDataService {
  getAll = (page = 0) => {
    return axios.get(`${backendUrl}?page=${page}`);
  };

  getMovie = (id) => {
    return axios.get(`${backendUrl}/id/${id}`);
  };

  find = (query, by = "title", page = 0) => {
    return axios.get(`${backendUrl}?${by}=${query}&page=${page}`);
  };

  createReview = (data) => {
    return axios.post(`${backendUrl}/review`, data);
  };

  updateReview = (data) => {
    return axios.put(`${backendUrl}/review`, data);
  };

  deleteReview = (id, userId) => {
    return axios.delete(`${backendUrl}/review`, {
      data: { review_id: id, user_id: userId },
    });
  };

  getRatings = () => {
    return axios.get(`${backendUrl}/ratings`);
  };
}

export default new MovieDataService();
