import axios from "./customize-axiois";

const actionApi = {
  getAll: (
    page: number,
    limit: number,
    startDate: string,
    endDate: string,
    sortColum: string,
    sortDirection: string
  ) => {
    return axios.get(
      `actions?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&sortColumn=${sortColum}&sortDirection=${sortDirection}`
    );
  },
};

export default actionApi;
