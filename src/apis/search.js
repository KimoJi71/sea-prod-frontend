import apiRequest from "./api";

const search = {
  getToday: (payload) => apiRequest.get(`/search_location/today?location=${payload.location}&type=${payload.type}`),
  getThreeDay: (payload) => apiRequest.get(`/search_location/threeday?location=${payload.location}&type=${payload.type}`),
  getOneWeek: (payload) => apiRequest.get(`/search_location/oneweek?location=${payload.location}&type=${payload.type}`),
};

export default search;