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
  endDate: string,
  temperature: { min: number; max: number },
  humidity: { min: number; max: number },
  light: { min: number; max: number }
) => {
  return axios.get(
    `data?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&minTemp=${temperature.min}&maxTemp=${temperature.max}&minHumid=${humidity.min}&maxHumid=${humidity.max}&minLight=${light.min}&maxLight=${light.max}`
  );
};

export { fetchDataAction, fetchDataSensor };
