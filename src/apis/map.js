import apiRequest from "./api";

const map = {
  getAED: () => apiRequest.get(`/map/AED`),
  getLocations: (type) => apiRequest.get(`/map/location/detail/1?type=${type}`),
  getSeaLocations: () => apiRequest.get(`/map/location/detail/2`),
  getWaterQuality: () => apiRequest.get(`/map/water_quality`),
};

export default map;