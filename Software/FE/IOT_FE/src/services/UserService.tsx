import axios from "./customize-axiois";

const fetchDataAction = (
  page: number,
  limit: number,
  startDate: string,
  endDate: string
) => {
  return axios.get(
    `actions?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
  );
};

const fetchDataSensor = (
  page: number,
  limit: number,
  startDate: string,
  endDate: string
) => {
  return axios.get(
    `data?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
  );
};

export { fetchDataAction, fetchDataSensor };
