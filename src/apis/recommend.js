import apiRequest from "./api";

const recommend = {
  getRecommend: () => apiRequest.get(`/recommend`),
};

export default recommend;