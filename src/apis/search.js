import apiRequest from "./api";

const search = {
  getToday: (location, type) => apiRequest.get(`/search_location/today?location=${location}&type=${type}`),
  getThreeDay: (location, type) => apiRequest.get(`/search_location/threeday?location=${location}&type=${type}`),
  getOneWeek: (location, type) => apiRequest.get(`/search_location/oneweek?location=${location}&type=${type}`),
};

export default search;