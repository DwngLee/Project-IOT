import axios from "./customize-axiois";

const dataSensorApi = {
  getAll: (
    page: number,
    limit: number,
    searchBy: string,
    keyword: string,
    temperature: { min: number; max: number },
    humidity: { min: number; max: number },
    light: { min: number; max: number },
    sortColum: string,
    sortDirection: string
  ) => {
    return axios.get(
      `data?page=${page}&limit=${limit}&searchBy=${searchBy}&keyword=${keyword}&minTemp=${temperature.min}&maxTemp=${temperature.max}&minHumid=${humidity.min}&maxHumid=${humidity.max}&minLight=${light.min}&maxLight=${light.max}&sortColumn=${sortColum}&sortDirection=${sortDirection}`
    );
  },

  getData4DashBoard: (page: number, limit: number) => {
    return axios.get(
      `data?page=${page}&limit=${limit}&minTemp=&maxTemp=&minHumid=&maxHumid=&minLight=&maxLight=`
    );
  },
  searchData: (
    keyword: string,
    searchBy: string,
    pageNo: number,
    limit: number
  ) => {
    return axios.get(
      `data/search?keyword=${keyword}&searchBy=${searchBy}&limit=${limit}&pageNo=${pageNo}`
    );
  },
};

export default dataSensorApi;
