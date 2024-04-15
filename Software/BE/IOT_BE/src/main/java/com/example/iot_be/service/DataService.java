package com.example.iot_be.service;

import com.example.iot_be.enity.DataSensor;
import org.springframework.data.domain.Page;

public interface DataService {

    Page<DataSensor> getData(int pageNo,
                             int limit,
                             String keyword,
                             String searchBy,
                             double minTemp,
                             double maxTemp,
                             double minHumid,
                             double maxHumid,
                             double minLight,
                             double maxLight,
                             String sortColum,
                             String sortDirection);
}
