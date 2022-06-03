import apiRequest from "./api";

const blueRoad = {
  getBlueRoadResult: (route, route_code, datetime) => apiRequest.get(`/sea_route?route=${route}&route_code=${route_code}&datetime=${datetime}`),
};

export default blueRoad;