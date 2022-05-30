import apiRequest from "./api";

const map = {
  getAED: () => apiRequest.get(`/map/AED`),
  getLocations: (type) => apiRequest.get(`/map/location/detail/1?type=${type}`),
};

export default map;