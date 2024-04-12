import axiosClient from "./axiosClient";

const dataSensorApi = {
  getAll: (params) => {
    const url = "/data";
    return axiosClient.get(url, { params });
  },
};

export default dataSensorApi;
