import axios from "./customize-axiois";

const actionApi = {
  getAll: (page: number, limit: number, startDate: string, endDate: string) => {
    return axios.get(
      `actions?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
    );
  },
};


export default actionApi;