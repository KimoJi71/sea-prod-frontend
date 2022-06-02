import apiRequest from "./api";

const recommend = {
  getRecommend: (location, type) => apiRequest.get(`/recommend?location=${location}&type=${type}`),
};

export default recommend;